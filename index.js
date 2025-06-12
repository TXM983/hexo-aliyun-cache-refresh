'use strict';

const AliyunCdnRefresher = require('./lib/refresher');

// 监听 deploy 完成后自动执行刷新
hexo.on('deployAfter', async () => {
    const config = hexo.config.aliyun_cdn_refresh || hexo.config.theme_config.aliyun_cdn_refresh || {};

    if(!config.enable) return

    if (!config.accessKeyId || !config.accessKeySecret || !config.paths) {
        hexo.log.error('[alicdn-refresh] 请正确配置 accessKeyId、accessKeySecret 和 paths');
        return;
    }

    const refresher = new AliyunCdnRefresher({
        accessKeyId: config.accessKeyId,
        accessKeySecret: config.accessKeySecret,
    });

    hexo.log.info('[alicdn-refresh] 部署完成，开始刷新阿里云 CDN 缓存...');

    for (const item of config.paths) {
        let url, type;
        if (typeof item === 'string') {
            url = item;
            type = 'File';
        } else if (typeof item === 'object') {
            url = item.url;
            type = item.type || 'File';
        } else {
            hexo.log.warn('[alicdn-refresh] 跳过无效配置项:', item);
            continue;
        }

        hexo.log.info(`[alicdn-refresh] 刷新中: ${url} (${type})`);

        try {
            const resp = await refresher.refresh(type, url);
            const body = resp?.body;
            if (resp.statusCode === 200 && body?.refreshTaskId && body?.requestId) {
                hexo.log.info(`[alicdn-refresh] 刷新成功: ${url} 返回报文: ${JSON.stringify(resp)}`);
            } else {
                hexo.log.warn(`[alicdn-refresh] 刷新请求返回状态码正常，但内容异常: ${url} 返回报文: ${JSON.stringify(resp)}`);
            }
        } catch (err) {
            hexo.log.error(`[alicdn-refresh] 刷新失败: ${url}`, err);
        }
    }

    hexo.log.info('[alicdn-refresh] 缓存刷新任务完成');
});
