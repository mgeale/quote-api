import fetchIndicativeQuoteAsync from './indicativeQuote';
import { TakerRequest, IndicativeQuote } from '@0x/quote-server';
import { BigNumber } from '@0x/utils';
import {SINGLE_DAI} from '../constants';

describe('indicative quote', () => {
  it('should return quote', async done => {
    const request: TakerRequest = {
      sellTokenAddress: '',
      buyTokenAddress: '',
      takerAddress: '',
      buyAmountBaseUnits: new BigNumber(SINGLE_DAI),
    };
    const result = await fetchIndicativeQuoteAsync(request);
    expect(result).toBe(undefined);
    done();
  });
});
