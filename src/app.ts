
import type { PluginOptions} from './types';
import { prismaService } from "./core/prisma-service"

const debug = require('debug')('prisma-plugin');

//@ts-ignore
export { Prisma } from '@prisma/client';
export { PrismaConfig } from './types';
export { prisma } from "./core/prisma-service";

/**
 * yunfly plugin
 * app.ts 是常规插件的入口文件
 * @export
 * @param {PluginOptions} {
 *   config,
 *   pluginConfig,
 * }
 * @returns {void}
 */
export default async function yunflyPlugin({
  pluginConfig,
  apolloConfig,
}: PluginOptions): Promise<any> {
  const { enable } = pluginConfig || {};

  if (!enable) {
    return;
  }

  let db: any = pluginConfig.db;
  if (typeof (db) === 'function') {
    db = db(apolloConfig);
  }

  debug('【yunfly-plugin-prisma】: config.prisma.db ', db);

  if (db && !db.url) {
    throw new Error('【prisma】】: config prisma.db 配置有误!');
  }

  const clientConfig = pluginConfig.client || {};

  if (db?.url) {
    process.env.DATABASE_URL = db.url;
    if (!clientConfig.datasources?.db?.url) {
      clientConfig.datasources = { db: { url: db.url } };
    }
  }

  return await prismaService(clientConfig);
}
