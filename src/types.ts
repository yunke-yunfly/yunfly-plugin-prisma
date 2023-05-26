
import type { Config, KoaApp } from '@yunflyjs/yunfly';

interface DbConfig {
  url: string;
  databaseUrlKey?: string;
}

type Datasource = {
  url?: string
}

type Datasources = {
  db?: Datasource
}

export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type ModelName = 'User' | 'Post';
type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
type RejectOnNotFound = boolean | ((error: Error) => Error)
type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
type RejectPerOperation = { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound }

export interface PrismaConfig {
  enable: boolean;
  db?: DbConfig | ((apolloConfig: ApolloConfig_) => DbConfig);
  client?: {
    datasources?: Datasources;
    log?: (LogLevel | LogDefinition)[];
    errorFormat?: ErrorFormat;
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation;
  }
}

// 定义当前插件所需参数
export type AnyOptionConfig = Record<string, any>;

export type ApolloConfig_ = Record<string, any>;

export interface PluginOptions {
  koaApp: KoaApp;
  apolloConfig: ApolloConfig_;
  pluginConfig: PrismaConfig;
  config: Config;
}


