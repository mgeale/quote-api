import { Web3Wrapper } from '@0x/web3-wrapper';
import { TakerRequest, FirmQuote } from '@0x/quote-server';
import { MAKER_WALLET } from '../constants';
import { DECIMALS } from '../constants';

export async function fetchFirmQuoteAsync(
  takerRequest: TakerRequest
): Promise<FirmQuote | undefined> {

  const prices = await getPrice(takerRequest.buyTokenAddress, takerRequest.sellTokenAddress);
  const price = prices[takerRequest.sellTokenAddress]/prices[takerRequest.buyTokenAddress];

  const takerAmount = takerRequest.sellAmountBaseUnits.multipliedBy(price);

  const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(takerRequest.sellAmountBaseUnits, DECIMALS);
  const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(takerAmount, DECIMALS);

  const signedOrder = await signOrder(MAKER_WALLET, takerRequest.takerAddress, makerAssetAmount, takerAssetAmount);

  return <FirmQuote> {
    signedOrder
  };
}
