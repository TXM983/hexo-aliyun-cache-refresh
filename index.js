'use strict';

const AliyunCacheRefresher = require('./lib/refresher');

// 监听 deploy 完成后自动执行刷新
hexo.on('deployAfter', async () => {
    const config = hexo.config.aliyun_cdn_refresh || hexo.config.theme_config.aliyun_cdn_refresh || {};

    if (!config.enable) return;

    if (!config.accessKeyId || !config.accessKeySecret || !config.paths) {
        hexo.log.error('[alicdn-refresh] 请正确配置 accessKeyId、accessKeySecret 和 paths');
        return;
    }

    const refresher = new AliyunCacheRefresher({
        accessKeyId: config.accessKeyId,
        accessKeySecret: config.accessKeySecret,
        siteId: config.siteId, // 仅 ESA 需要
    });

    hexo.log.info('[alicdn-refresh] 部署完成，开始刷新阿里云缓存...');

    for (const item of config.paths) {
        let url, type = 'File', service = 'cdn';

        if (typeof item === 'string') {
            url = item;
        } else if (typeof item === 'object') {
            url = item.url;
            type = item.type || 'File';
            service = item.service || 'cdn';
        } else {
            hexo.log.warn('[alicdn-refresh] 跳过无效配置项:', item);
            continue;
        }

        hexo.log.info(`[alicdn-refresh] 刷新中: ${url} (${type}, ${service})`);

        try {
            const resp = await refresher.refresh(type, url, service);
            const body = resp?.body;
            const taskId = body?.refreshTaskId || body?.taskId || '-';
            const requestId = body?.requestId || '-';

            if (resp.statusCode === 200 && taskId !== '-') {
                console.log(`[alicdn-refresh] 刷新成功: ${url}，任务 ID: ${taskId}，请求 ID: ${requestId}`);
            } else {
                console.warn(`[alicdn-refresh] 返回状态正常但内容异常: ${url}，响应: ${JSON.stringify(resp)}`);
            }
        } catch (err) {
            console.error(`[alicdn-refresh] 刷新失败: ${url}`, err);
        }
    }

    hexo.log.info('[aliyun-cache] 缓存刷新任务完成');
});
