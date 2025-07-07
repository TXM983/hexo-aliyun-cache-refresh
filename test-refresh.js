'use strict';

const AliyunCacheRefresher = require('./lib/refresher');

async function main() {
    // 这里请替换成你自己的阿里云密钥和 ESA siteId
    const config = {
        accessKeyId: 'xxxx',
        accessKeySecret: 'xxxx',
        siteId: 'xxxx', // 如果用不到ESA，可以不传
    };

    const refresher = new AliyunCacheRefresher(config);

    try {
        // 刷新ESA目录缓存示例
        const esaResp = await refresher.refresh(
            'Directory',
            'https://miraii.cn/',
            'ESA'
        );
        console.log('ESA 刷新结果:', esaResp);
    } catch (err) {
        console.error('刷新出错:', err);
    }
}

main();
