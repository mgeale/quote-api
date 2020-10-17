import fetchIndicativeQuoteAsync from '../strategies/indicativeQuote';
import { TakerRequest } from '@0x/quote-server';
import { BigNumber } from '@0x/utils';
import {
  SINGLE_DAI,
  TAKER_ADDRESS,
  TOKEN_ADDRESS,
  ENCODED_ASSET,
} from './constants';
import { getRedisConnection } from '../connections/redis';

describe('indicative quote', () => {
  const key = 'ZRX';
  const value = '1000000000';

  beforeAll(async () => {
    const client = getRedisConnection();
    await client.write(key, value, new Date(2025, 1, 1));
  });

  it('should return quote', async done => {
    const request: TakerRequest = {
      sellTokenAddress: TOKEN_ADDRESS.DAI,
      buyTokenAddress: TOKEN_ADDRESS.WETH,
      takerAddress: TAKER_ADDRESS,
      buyAmountBaseUnits: new BigNumber(SINGLE_DAI),
    };
    const result = await fetchIndicativeQuoteAsync(request);
    expect(result).toEqual({
      makerAssetData: ENCODED_ASSET.DAI,
      makerAssetAmount: new BigNumber(value),
      takerAssetData: ENCODED_ASSET.WETH,
      takerAssetAmount: new BigNumber(0),
      expirationTimeSeconds: new BigNumber(0),
    });
    done();
  });
});
