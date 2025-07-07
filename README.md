# hexo-aliyun-cache-refresh

🚀 一个用于 Hexo 的自动化插件，在网站部署后自动刷新阿里云 CDN 或 ESA 的缓存，加速页面更新同步，省去手动操作控制台的繁琐步骤。

---

## ✨ 插件特性

- 🌀 **自动触发**：部署 (`hexo deploy`) 后自动刷新缓存；
- 🌐 **多服务支持**：支持刷新阿里云 CDN 和边缘计算加速平台 ESA；
- 📁 **文件/目录灵活刷新**：支持精确到某个文件或整目录的刷新；
- 💡 **多路径配置**：支持多条刷新路径，独立配置类型与服务；
- 🧰 **开箱即用**：安装后简单配置即可使用，部署流程无感集成。

---

## 📦 安装方法

在 Hexo 项目根目录中执行：

```bash
npm install hexo-aliyun-cache-refresh --save
```

## 插件配置
在主配置文件 _config.yml（或主题配置文件中）添加：
```shell
aliyun_cdn_refresh:
  enable: true
  accessKeyId: YOUR_ACCESS_KEY_ID         
  accessKeySecret: YOUR_ACCESS_KEY_SECRET 
  siteId: 810543187184144                 # ESA 所需，登录阿里云控制台获取
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

## ⚠️ 注意事项
- type 仅支持 File 或 Directory（区分大小写）；
- Directory 类型的路径必须以 / 结尾；
- service 可填 CDN 或 ESA，默认值为 CDN；
- 建议将博客仓库设置为私有以避免泄露 AccessKey。


## 🚀 使用方式
执行以下命令部署：
```shell
hexo clean && hexo g && hexo d
```
部署完成后，插件将自动读取配置并刷新 CDN / ESA 缓存，无需额外命令。


## 📚 相关文档

- [阿里云 CDN 刷新缓存](https://help.aliyun.com/document_detail/27136.html)
- [阿里云 ESA API 文档](https://api.aliyun.com/product/ESA)
- [Hexo 插件开发文档](https://hexo.io/zh-cn/docs/plugins)
