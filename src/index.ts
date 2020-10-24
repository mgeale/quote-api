import { NextFunction } from 'express';
import express from 'express';
import { serverRoutes, Quoter } from '@0x/quote-server';
import fetchIndicativeQuoteAsync from './strategies/indicativeQuote';
import { fetchFirmQuoteAsync } from './strategies/firmQuote';
import { submitFillAsync } from './strategies/submitFill';
// import {initRedisConnectionAsync} from './connections/redis';
import { initProviderAsync } from './connections/providerEngine';
import {REDIS_URL, REDIS_PREFIX, TOKEN_ADDRESS, RPC_URL} from './constants';
import redis from 'redis';

const PORT = process.env.PORT || 8080;
const app = express();

const quoteStrategy: Quoter = {
  fetchIndicativeQuoteAsync,
  fetchFirmQuoteAsync,
  submitFillAsync,
};

var logger = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  const start = Date.now();
  console.info(`${req.method} ${req.path}`);

  res.on('finish', () => {
    const time = Date.now() - start;
    console.info(
      `${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') ||
        0}b sent; ${time} milliseconds`
    );
  });

  next();
};

(async () => {
  await initProviderAsync();
})();

app.use(logger);

app.use('/', serverRoutes(quoteStrategy));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
