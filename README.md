This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## 部署指南 (Deployment)

### Docker 部署

本项目已包含基于 Alpine 的多阶段构建 `Dockerfile`，生成的镜像体积小且安全。

1. **构建镜像**：

```bash
docker build -t telegram-spider-next .
```

2. **运行容器**：

```bash
docker run -d -p 3000:3000 --name telegram-spider-next --restart unless-stopped telegram-spider-next
```

访问 `http://localhost:3000` 即可看到运行的应用。

### PM2 部署

本项目配置了 `output: 'standalone'`，推荐使用 standalone 模式进行部署，可以显著降低内存占用。

#### 1. 构建项目

```bash
npm run build
```

#### 2. 准备运行文件

Standalone 模式需要手动将静态资源复制到运行目录：

```bash
# 复制 public 目录
cp -r public .next/standalone/

# 复制静态资源 (static)
cp -r .next/static .next/standalone/.next/
```

#### 3. 启动服务

使用 PM2 启动 standalone 服务：

```bash
pm2 start .next/standalone/server.js --name telegram-spider-next
```

或者使用标准模式启动（不推荐，内存占用较高）：

```bash
pm2 start npm --name telegram-spider-next -- start
```
