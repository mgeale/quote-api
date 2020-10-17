import { promisify } from 'util';
import { ClientOpts, Callback, RedisClient } from 'redis';
const DEFAULT_URL = 'redis://127.0.0.1:6379';
const PREFIX = '__prefix:';

interface Client {
  get(key: string): Promise<string>;
  set(key: string, val: string): Promise<any>;
  setex(key: string, expires: string, val: string): Promise<any>;
}

let connectionIfExists: Redis | undefined;

export function getRedisConnection(): Redis {
  if (!connectionIfExists) {
    throw new Error('Redis connection not initialized');
  }
  return connectionIfExists;
}

export async function initRedisConnectionAsync(
  client: RedisClient
): Promise<void> {
  if (connectionIfExists) {
    throw new Error('Redis connection already exists');
  }
  connectionIfExists = new Redis(client);
}

class Redis {
  private static instance: Redis;
  private client: Client;

  constructor(private store: RedisClient, options: ClientOpts = {}) {
    this.client = {
      get: key => {
        const start = new Date();
        const getAsync = promisify(this.store.get).bind(this.store);
        return getAsync(key).finally(
          console.log({ action: 'READ', key, start })
        );
      },
      set: (key: string, val: string) => {
        const start = new Date();
        const setAsync = promisify(this.store.set).bind(this.store);
        return setAsync(key, val).finally(
          console.log({ action: 'WRITE', key, start })
        );
      },
      setex: (key, expires, val) => {
        const start = new Date();
        const setexAsync = promisify(this.store.setex).bind(this.store);
        return setexAsync(key, expires, val).finally(
          console.log({ action: 'WRITE', key, start, expires })
        );
      },
    };
  }

  disconnect(callback: Callback<string>) {
    this.store.quit(callback);
  }

  async read(key: string): Promise<string> {
    const res = await this.client.get(key);
    if (!res) {
      return null;
    }
    try {
      return JSON.parse(res);
    } catch (ex) {
      return null;
    }
  }

  async write(key: string, value: string, expires): Promise<any> {
    await this.client.setex(key, expires, JSON.stringify(value));
  }

  async fetch(key: string, expires: string, callback): Promise<any> {
    let obj = await this.read(key);
    if (obj) {
      return obj;
    }
    obj = await callback();
    await this.write(key, obj, expires);
    return obj;
  }
}
