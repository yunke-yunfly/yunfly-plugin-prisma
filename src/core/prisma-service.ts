import { PrismaClient } from '@prisma/client'
import type { PrismaConfig } from '../types';
const debug = require('debug')('prisma-plugin');

let cachePrisma: PrismaClient;
let config: PrismaConfig["client"];

export const prisma = new Proxy({}, {
  get: async (obj: any, prop: string) => {
    if (cachePrisma) {
      return (cachePrisma as any)[prop]
    } else {
      await prismaService(config);
      return (cachePrisma as any)[prop]
    }
  }
});

/**
 * init prisma
 *
 * @export
 * @param {PrismaConfig} option
 * @return {*}  {PrismaClient}
 */
export async function prismaService(option: PrismaConfig["client"]): Promise<PrismaClient> {
  debug('【yunfly-plugin-prisma】: PrismaClient option ', option)
  if (cachePrisma) {
    return cachePrisma;
  }
  config = option;
  try {
    cachePrisma = new PrismaClient(option);
    await cachePrisma.$connect();
  } catch (error: any) {
    console.error({
      msg: 'init prisma error',
      PrismaClient: { option, url: process.env.DATABASE_URL },
      error,
    });
    process.exit(-1);
  }
  return cachePrisma;
}

process.on('error', () => {
  if (cachePrisma) {
    cachePrisma.$disconnect();
  }
})
