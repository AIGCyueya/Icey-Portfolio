# LONG YUJIE · 龙雨洁

个人作品集网站：AI 产品运营 · AI 生态建设 · AI Creator。

在线仓库：[AIGCyueya/Icey-Portfolio](https://github.com/AIGCyueya/Icey-Portfolio)

## 页面

| 路径 | 内容 |
| ---- | ---- |
| `/` | 首页 |
| `/projects` | 项目案例 |
| `/journey` | 成长路径 |
| `/lab` | AI Lab |
| `/profile` | 关于我 |

## 内容在哪改

文案与数据在 `public/profile/`，图片在 `public/images/`。

| 文件 | 用途 |
| ---- | ---- |
| `navbar.json` | 导航 |
| `routes.json` | 路由 |
| `home.json` | 首页 |
| `projects.json` | 项目 |
| `journey.json` | 成长路径 |
| `creator.json` | AI Lab |
| `about.json` | 关于我 |
| `social.json` | 社交链接 |

改完后刷新本地页面即可看到效果。

## 本地运行

需要 Node.js 18+。

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000/`。

```bash
npm run build    # 产出到 build/
npm run preview  # 预览生产构建
```

## 部署

静态站点，构建产物在 `build/`。可用 Vercel 等托管；`vercel.json` 里已配置构建命令与输出目录 `build`。

若线上刷新子路由（如 `/projects`）出现 404，需在托管平台把所有路径回退到 `index.html`。

## 技术栈

React 18 · Vite · React Router · styled-components

## 许可

本仓库基于 MIT 许可的开源模板二次开发，详见 [LICENSE.md](LICENSE.md)。
