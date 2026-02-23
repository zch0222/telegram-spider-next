# 使用 Alpine 版 Node.js 作为轻量级基础镜像 (如果你的项目需要 node 20，可以改为 node:20-alpine)
FROM node:18-alpine AS base

# ---------------------------------------------------
# 阶段 1：安装依赖 (Deps)
# ---------------------------------------------------
FROM base AS deps
# 针对 Alpine 补充兼容性 C 库，防止某些原生依赖报错（如 sharp）
# 安装 python3, make, g++ 以及 canvas 编译所需的依赖库
RUN apk add --no-cache libc6-compat python3 make g++ build-base cairo-dev pango-dev jpeg-dev giflib-dev librsvg-dev
WORKDIR /app

# 利用 Docker 缓存层，只有当 package.json 相关文件变化时才重新执行 npm ci
# 如果你使用的是 yarn 或 pnpm，请相应修改此处的 lock 文件名和安装命令
COPY package.json package-lock.json* ./
RUN npm ci

# ---------------------------------------------------
# 阶段 2：构建项目 (Builder)
# ---------------------------------------------------
FROM base AS builder
WORKDIR /app

# 复制已安装的依赖模块
COPY --from=deps /app/node_modules ./node_modules
# 复制项目所有源码
COPY . .

# 设置构建时的环境变量，确保 output: 'standalone' 生效
ENV NODE_ENV=production

# 【核心步骤】：将本地的 .env.local 复制到镜像内，并命名为 .env.production
# 这一步是强制 Next.js 在 build 阶段读取到 NEXT_PUBLIC_ 开头的变量，
# 并将它们硬编码打包进最终发给客户端的 JS 文件中。
COPY .env.local .env.production

# 执行 Next.js 生产环境构建
# （请务必确认你的 next.config.js 中已配置 output: 'standalone'）
RUN npm run build

# ---------------------------------------------------
# 阶段 3：运行服务 (Runner)
# ---------------------------------------------------
FROM base AS runner
WORKDIR /app

# 安装 canvas 运行时所需的依赖库
RUN apk add --no-cache cairo pango jpeg giflib librsvg

# 设置生产环境变量
ENV NODE_ENV=production

# 创建非 root 用户 (nodejs) 和用户组 (nextjs)，以最小权限运行服务，提升安全性
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 仅复制 standalone 模式真正需要的静态文件和入口程序
# 1. 复制 public 目录（favicon, robots.txt, 静态图片等）
COPY --from=builder /app/public ./public

# 2. 复制 standalone 生成的服务端骨架文件
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# 3. 复制静态打包产物 (JS/CSS) 到正确的相对路径下
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换为权限受限的非 root 用户
USER nextjs

# 暴露端口给宿主机或反向代理
EXPOSE 3000
ENV PORT=3000
# 必须设置为 0.0.0.0，否则在 Docker 容器外无法访问网络
ENV HOSTNAME="0.0.0.0"

# 启动 standalone 模式的 Node.js 服务器
CMD ["node", "server.js"]