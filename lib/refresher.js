'use strict';

const path = require('path');

class AliyunCacheRefresher {
    constructor({ accessKeyId, accessKeySecret, siteId }) {
        this.accessKeyId = accessKeyId;
        this.accessKeySecret = accessKeySecret;
        this.siteId = siteId;

        // 延迟初始化，按需加载
        this.instances = {};
    }

    /**
     * 按需初始化指定服务
     * @param {string} service - 'cdn' 或 'esa'
     */
    init(service) {
        if (this.instances[service]) return this.instances[service];

        if (service === 'CDN') {
            const CdnRefresher = require(path.join(__dirname, 'services/cdn'));
            this.instances.CDN = new CdnRefresher({
                accessKeyId: this.accessKeyId,
                accessKeySecret: this.accessKeySecret,
            });
        } else if (service === 'ESA') {
            const EsaRefresher = require(path.join(__dirname, 'services/esa'));
            this.instances.ESA = new EsaRefresher({
                accessKeyId: this.accessKeyId,
                accessKeySecret: this.accessKeySecret,
                siteId: this.siteId,
            });
        } else {
            throw new Error(`不支持的服务类型: ${service}`);
        }

        return this.instances[service];
    }

    /**
     * 根据 service 类型调用对应的刷新方法
     * @param {string} type - 'File' 或 'Directory'
     * @param {string} url - 完整 URL
     * @param {string} service - 'cdn' 或 'esa'（默认 cdn）
     */
    async refresh(type, url, service = 'cdn') {
        const handler = this.init(service);
        return await handler.refresh(type, url);
    }
}

module.exports = AliyunCacheRefresher;
