'use strict';

const Cdn = require('@alicloud/cdn20180510').default;
const $Cdn = require('@alicloud/cdn20180510');
const OpenApi = require('@alicloud/openapi-client');
const Console = require('@alicloud/tea-console');

class CdnRefresher {
    constructor({ accessKeyId, accessKeySecret }) {
        this.client = new Cdn(new OpenApi.Config({
            accessKeyId,
            accessKeySecret,
            endpoint: 'cdn.aliyuncs.com',
        }));
    }

    async refresh(objectType, objectPath) {
        try {
            const req = new $Cdn.RefreshObjectCachesRequest({
                objectType,
                objectPath,
            });

            return await this.client.refreshObjectCaches(req);
        } catch (error) {
            console.log(`CDN 刷新失败: ${objectPath}，错误信息: ${error.message || error}`);
            throw error;
        }
    }
}

module.exports = CdnRefresher;
