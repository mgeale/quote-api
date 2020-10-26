import { Web3Wrapper } from '@0x/web3-wrapper';
import { TakerRequest, FirmQuote } from '@0x/quote-server';
import { getRedisConnection } from '../connections/redis';

export default async function fetchFirmQuoteAsync(
  takerRequest: TakerRequest
): Promise<FirmQuote | undefined> {

  const redisConnection = getRedisConnection();

  const prices = await redisConnection.read('key'); // update key
  const price = prices[takerRequest.sellTokenAddress]/prices[takerRequest.buyTokenAddress];

  const takerAmount = takerRequest.sellAmountBaseUnits.multipliedBy(price);

  const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(takerRequest.sellAmountBaseUnits, 18);
  const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(takerAmount, 18);

  const signedOrder = await signOrder(takerRequest.takerAddress, makerAssetAmount, takerAssetAmount);

  return <FirmQuote> {
    signedOrder
  };
}
