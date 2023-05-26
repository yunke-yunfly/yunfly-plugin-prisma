import type { PrismaConfig } from "../types";

/**
 * 包内置默认配置项
 *
 * @export
 * @param {KoaApp} app
 * @returns
 */
export default function config(): any {
  const config: any & { prisma: PrismaConfig } = {};

  // 插件配置
  config.prisma = {
    enable: false,
  };

  return config;
}
