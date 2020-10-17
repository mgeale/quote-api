import { TakerRequest, IndicativeQuote } from '@0x/quote-server';
import { BigNumber } from '@0x/utils';
import { assetDataUtils } from '@0x/order-utils';
import { getRedisConnection } from '../connections/redis';

export default async function fetchIndicativeQuoteAsync(
  takerRequest: TakerRequest
): Promise<IndicativeQuote | undefined> {
  const makerAssetData = assetDataUtils.encodeERC20AssetData(
    takerRequest.sellTokenAddress
  );
  const takerAssetData = assetDataUtils.encodeERC20AssetData(
    takerRequest.buyTokenAddress
  );

  const redis = getRedisConnection();
  const price = await redis.read('ZRX');

  const quote: IndicativeQuote = {
    makerAssetData,
    makerAssetAmount: new BigNumber(price),
    takerAssetData,
    takerAssetAmount: new BigNumber(0),
    expirationTimeSeconds: new BigNumber(0),
  };

  const promise: Promise<IndicativeQuote> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(quote);
    }, 300);
  });

  return promise;
}
