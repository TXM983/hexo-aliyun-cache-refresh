'use strict';

const Cdn = require('@alicloud/cdn20180510').default;
const OpenApi = require('@alicloud/openapi-client');
const Console = require('@alicloud/tea-console');
const Util = require('@alicloud/tea-util');

class AliyunCdnRefresher {
    constructor({ accessKeyId, accessKeySecret }) {
        this.client = new Cdn(new OpenApi.Config({
            accessKeyId,
            accessKeySecret,
            endpoint: 'cdn.aliyuncs.com', // 固定写法
        }));
    }

    /**
     * 刷新缓存
     * @param {string} objectType - File 或 Directory
     * @param {string} objectPath - 要刷新的路径，必须带域名
     */
    async refresh(objectType, objectPath) {
        try {
            const resp = await this.client.refreshObjectCaches({
                ObjectPath: objectPath,
                ObjectType: objectType,
            });
            console.log(resp);
            return resp;
        } catch (error) {
            console.error(`刷新失败: ${objectPath}`, error);
            throw error;
        }
    }

}

module.exports = AliyunCdnRefresher;
