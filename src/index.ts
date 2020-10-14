import { NextFunction } from 'express';
import express from 'express';
import { serverRoutes, Quoter } from '@0x/quote-server';
import fetchIndicativeQuoteAsync from './strategies/indicativeQuote';
import { fetchFirmQuoteAsync } from './strategies/firmQuote';
import { submitFillAsync } from './strategies/submitFill';

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
  console.info(`${req.method} ${req.path}`);

  res.on('finish', () => {
    console.info(
      `${res.statusCode} ${res.statusMessage}; ${res.get('Content-Length') ||
        0}b sent`
    );
  });

  next();
};

app.use(logger);

app.use('/', serverRoutes(quoteStrategy));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
