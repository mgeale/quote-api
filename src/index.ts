import redis from 'redis';
import { NextFunction } from 'express';
import express from 'express';
import fetchIndicativeQuoteAsync from './strategies/indicativeQuote';
import fetchFirmQuoteAsync from './strategies/firmQuote';
import submitFillAsync from './strategies/submitFill';
import { serverRoutes, Quoter } from '@0x/quote-server';
import { initRedisConnectionAsync } from './connections/redis';

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

const connections = async () => {
  await initRedisConnectionAsync(
    redis.createClient({
      url: 'redis://10.71.30.67:6379',
      prefix: '__prefix:',
    })
  );
};

connections();

app.use(logger);

app.use('/', serverRoutes(quoteStrategy));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
