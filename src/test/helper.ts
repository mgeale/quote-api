import redis from 'redis-mock';
import {
  initRedisConnectionAsync,
  getRedisConnection,
} from '../connections/redis';
// import {REDIS_URL, REDIS_PREFIX} from '../constants';

let client;

/*beforeAll(async done => {
  await initRedisConnectionAsync(
    redis.createClient({
      url: REDIS_URL,
      prefix: REDIS_PREFIX,
    })
  );
  done();
});

afterAll(done => {
  client = getRedisConnection();
  client.disconnect();
  done();
});*/
