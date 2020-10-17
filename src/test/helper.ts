import redis from 'redis-mock';
let client;
const DEFAULT_URL = 'redis://127.0.0.1:6379';
const PREFIX = '__prefix:';
import {
  initRedisConnectionAsync,
  getRedisConnection,
} from '../connections/redis';

beforeAll(async done => {
  await initRedisConnectionAsync(
    redis.createClient({
      url: DEFAULT_URL,
      prefix: PREFIX,
    })
  );
  done();
});

afterAll(done => {
  client = getRedisConnection();
  client.disconnect();
  done();
});
