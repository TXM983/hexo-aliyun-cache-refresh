'use strict';

const ESA20240910 = require('@alicloud/esa20240910');
const OpenApi = require('@alicloud/openapi-client');
const Util = require('@alicloud/tea-util');
const Credential = require('@alicloud/credentials');
const Tea = require('@alicloud/tea-typescript');

class EsaRefresher {
    constructor({ accessKeyId, accessKeySecret, siteId }) {
        if (!siteId) {
            throw new Error('[ESA] 必须提供 siteId');
        }
        this.siteId = siteId;

        const config = new OpenApi.Config({
            accessKeyId,
            accessKeySecret,
            endpoint: 'esa.cn-hangzhou.aliyuncs.com',
        });
        this.client = new ESA20240910.default(config);

    }


    async refresh(type, url) {
        try {
            const content = new ESA20240910.PurgeCachesRequestContent({
                cacheTags: [],
                purgeAll: false,
                directories: type.toLowerCase() === 'directory' ? [url] : [],
                objects: type.toLowerCase() === 'file' ? [url] : [],
            });

            const request = new ESA20240910.PurgeCachesRequest({
                content: content,
                siteId: this.siteId,
                type: type.toLowerCase(),
                force: true,
                edgeComputePurge: true,
            });

            let runtime = new Util.RuntimeOptions({ });
            return await this.client.purgeCachesWithOptions(request, runtime);
        } catch (error) {
            console.log(`ESA 刷新失败: ${url}，错误信息: ${error.message || error}`);
            throw error;
        }
    }
}

module.exports = EsaRefresher;
