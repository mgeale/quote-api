import { Web3Wrapper } from '@0x/web3-wrapper';
import { BigNumber } from '@0x/utils';
import { TakerRequest, FirmQuote } from '@0x/quote-server';
import { getRedisConnection } from '../connections/redis';

export default async function fetchFirmQuoteAsync(
  takerRequest: TakerRequest
): Promise<FirmQuote | undefined> {

  const redisConnection = getRedisConnection();

  const buyTokenPriceAsync = redisConnection.read(takerRequest.buyTokenAddress); // update key
  const sellTokenPriceAsync = redisConnection.read(takerRequest.sellTokenAddress); // update key
  const [buyTokenPrice, sellTokenPrice] = await Promise.all([buyTokenPriceAsync, sellTokenPriceAsync]);

  const sellPrice = new BigNumber(sellTokenPrice);
  const buyPrice = new BigNumber(buyTokenPrice);
  const price = sellPrice.dividedBy(buyPrice);
  if (price.isNaN()) return;

  const takerAmount = takerRequest.sellAmountBaseUnits.multipliedBy(price);

  const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(takerRequest.sellAmountBaseUnits, 18);
  const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(takerAmount, 18);

  // const signedOrder = await signOrder(takerRequest.takerAddress, makerAssetAmount, takerAssetAmount);

  return <FirmQuote> {
    signedOrder: {
      chainId: 1,
      exchangeAddress: 'exchangeAddress',
      makerAddress: 'makerAddress',
      takerAddress: 'takerAddress',
      feeRecipientAddress: 'feeRecipientAddress',
      senderAddress: 'senderAddress',
      makerAssetAmount: takerRequest.sellAmountBaseUnits,
      takerAssetAmount: takerRequest.sellAmountBaseUnits,
      makerFee: takerRequest.sellAmountBaseUnits,
      takerFee: takerRequest.sellAmountBaseUnits,
      expirationTimeSeconds: takerRequest.sellAmountBaseUnits,
      salt: takerRequest.sellAmountBaseUnits,
      makerAssetData: 'makerAssetData',
      takerAssetData: 'takerAssetData',
      makerFeeAssetData: 'makerFeeAssetData',
      takerFeeAssetData: 'takerFeeAssetData',
      signature: 'signedOrder'
    }
  };
}
