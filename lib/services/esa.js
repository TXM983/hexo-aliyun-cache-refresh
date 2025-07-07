'use strict';

const $ESA = require('@alicloud/esa20240910');
const OpenApi = require('@alicloud/openapi-client');
const $Util = require('@alicloud/tea-util');
const {default: Cdn} = require("@alicloud/cdn20180510");

class EsaRefresher {
    constructor({ accessKeyId, accessKeySecret, siteId }) {
        if (!siteId) {
            throw new Error('[ESA] 必须提供 siteId');
        }
        this.siteId = siteId;

        this.client = new Cdn(new OpenApi.Config({
            accessKeyId,
            accessKeySecret,
            endpoint: 'esa.cn-hangzhou.aliyuncs.com',
        }));
    }

    async refresh(type, url) {
        try {
            const content = new $ESA.PurgeCachesRequestContent({
                cacheTags: [],
                purgeAll: false,
                directories: type.toLowerCase() === 'directory' ? [url] : [],
                objects: type.toLowerCase() === 'file' ? [url] : [],
            });

            const request = new $ESA.PurgeCachesRequest({
                content,
                siteId: this.siteId,
                type: type.toLowerCase(),
                force: true,
                edgeComputePurge: true,
            });

            const runtime = new $Util.RuntimeOptions({});
            return await this.client.purgeCachesWithOptions(request, runtime);
        } catch (error) {
            console.log(`ESA 刷新失败: ${url}，错误信息: ${error.message || error}`);
            throw error;
        }
    }
}

module.exports = EsaRefresher;
