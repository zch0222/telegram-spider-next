# 使用 Node.js 的官方镜像作为基础镜像
FROM node:18-alpine as builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码到工作目录
COPY . .

# 构建应用
RUN npm run build

# 使用 Node.js 的官方镜像作为运行时镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 从构建阶段复制构建结果和依赖项到运行时镜像
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# 暴露端口 3000
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
