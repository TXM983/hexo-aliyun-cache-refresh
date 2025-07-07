# hexo-aliyun-cache-refresh

🚀 一个 Hexo 插件，用于在每次部署后自动刷新阿里云 CDN 缓存。

## ✨ 功能介绍

- 自动在 `hexo deploy` 后触发刷新；
- 支持文件和目录类型的刷新；
- 避免手动登录阿里云控制台操作，提高效率。
- 安装简单，开箱即用

## 📦 安装方法

```bash
npm install hexo-aliyun-cache-refresh --save
```

## ⚙️ 配置方式

在 Hexo 项目配置文件中添加以下配置：
```yaml
aliyun_cdn_refresh:
  enable: true
  accessKeyId: YOUR_ACCESS_KEY_ID
  accessKeySecret: YOUR_ACCESS_KEY_SECRET
  siteId: xxxxxx  # ESA 所需
  paths:
    - url: "https://www.aimiliy.top/"
      type: Directory
      service: CDN
    - url: "https://www.aimiliy.top/index.html"
      type: File
      service: ESA
    - url: "https://www.aimiliy.top/assets/img/logo.png"
      type: File
```
> ⚠️ 为了安全起见，建议项目private，以免密钥泄露。
> ⚠️ type为Directory时，url必填带/
> ⚠️ 不填 service 默认走 cdn

## 🚀 使用方式

部署时自动执行：
```bash
hexo clean && hexo g && hexo d
```

部署成功后会自动触发 CDN 缓存刷新。


## 🧪 效果示例
```yaml
[hexo-aliyun-cache-refresh] 🚀 开始刷新阿里云 CDN 缓存...
✅ 成功刷新：https://yourdomain.com/
✅ 成功刷新：https://yourdomain.com/index.html
```
