import { TakerRequest, IndicativeQuote } from '@0x/quote-server';
import { BigNumber } from '@0x/utils';
import { assetDataUtils } from '@0x/order-utils';
import { getRedisConnection } from '../connections/redis';

export default async function fetchIndicativeQuoteAsync(
  takerRequest: TakerRequest
): Promise<IndicativeQuote | undefined> {

  const redisConnection = getRedisConnection();

  const balanceAsync = redisConnection.read('key'); // update key
  const pricesAsync = redisConnection.read('key'); // update key
  const [balanceString, prices] = await Promise.all([balanceAsync, pricesAsync]);

  const balance = new BigNumber(balanceString);
  const price = prices[takerRequest.sellTokenAddress]/prices[takerRequest.buyTokenAddress];

  if (!price || balance.isZero()) return;

  const sellAmount = takerRequest.sellAmountBaseUnits.multipliedBy(price);
  const takerAmount = balance > sellAmount ? sellAmount : balance;

  return <IndicativeQuote> {
    makerAssetData: assetDataUtils.encodeERC20AssetData(
      takerRequest.sellTokenAddress
    ),
    makerAssetAmount: balance,
    takerAssetData: assetDataUtils.encodeERC20AssetData(
      takerRequest.buyTokenAddress
    ),
    takerAssetAmount: new BigNumber(takerAmount),
    expirationTimeSeconds: new BigNumber(Date.now()+10000000),
  };
}
