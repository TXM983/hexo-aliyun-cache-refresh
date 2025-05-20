'use strict';

const Cdn = require('@alicloud/cdn20180510').default;
const $Cdn = require('@alicloud/cdn20180510'); // 用来拿请求类
const OpenApi = require('@alicloud/openapi-client');
const Console = require('@alicloud/tea-console');
const Util = require('@alicloud/tea-util');

class AliyunCdnRefresher {
    constructor({ accessKeyId, accessKeySecret }) {
        this.client = new Cdn(new OpenApi.Config({
            accessKeyId,
            accessKeySecret,
            endpoint: 'cdn.aliyuncs.com',
        }));
    }

    /**
     * 刷新缓存
     * @param {string} objectType - File 或 Directory
     * @param {string} objectPath - 要刷新的路径，必须带域名
     */
    async refresh(objectType, objectPath) {
        try {
            // 这里用请求类实例包装参数
            const req = new $Cdn.RefreshObjectCachesRequest({
                objectType: objectType,
                objectPath: objectPath,
            });

            return await this.client.refreshObjectCaches(req);
        } catch (error) {
            Console.log(`刷新失败: ${objectPath}，错误信息: ${error.message || error}`);
            throw error;
        }
    }
}

module.exports = AliyunCdnRefresher;
