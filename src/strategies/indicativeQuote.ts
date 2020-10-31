import { TakerRequest, IndicativeQuote } from '@0x/quote-server';
import { BigNumber } from '@0x/utils';
import { assetDataUtils } from '@0x/order-utils';
import { getRedisConnection } from '../connections/redis';

export default async function fetchIndicativeQuoteAsync(
  takerRequest: TakerRequest
): Promise<IndicativeQuote | undefined> {

  const redisConnection = getRedisConnection();

  const balanceAsync = redisConnection.read(`bal-${takerRequest.buyTokenAddress}`);
  const buyTokenPriceAsync = redisConnection.read(takerRequest.buyTokenAddress);
  const sellTokenPriceAsync = redisConnection.read(takerRequest.sellTokenAddress);
  const [balanceString, buyTokenPrice, sellTokenPrice] = await Promise.all([balanceAsync, buyTokenPriceAsync, sellTokenPriceAsync]);

  const balance = new BigNumber(balanceString);
  const sellPrice = new BigNumber(sellTokenPrice);
  const buyPrice = new BigNumber(buyTokenPrice);
  const price = sellPrice.dividedBy(buyPrice);

  if (price.isNaN() || balance.isZero()) return;

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
