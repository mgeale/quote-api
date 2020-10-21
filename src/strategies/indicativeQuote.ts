import { TakerRequest, IndicativeQuote } from '@0x/quote-server';
import { BigNumber } from '@0x/utils';
import { assetDataUtils } from '@0x/order-utils';
import { getBalance } from '../lib/balance';
import {getPrice} from '../lib/price';
import {MAKER_WALLET} from '../constants';

export default async function fetchIndicativeQuoteAsync(
  takerRequest: TakerRequest
): Promise<IndicativeQuote | undefined> {
  const balanceAsync = await getBalance(takerRequest.buyTokenAddress, MAKER_WALLET);
  const priceAsync = await getPrice(takerRequest.buyTokenAddress, takerRequest.sellTokenAddress);
  const [balance, prices] = await Promise.all([balanceAsync, priceAsync]);
  // if (!price || balance == 0) return;
  const price = prices[takerRequest.sellTokenAddress]/prices[takerRequest.buyTokenAddress]
  const sellAmount = takerRequest.sellAmountBaseUnits.multipliedBy(price);
  // const takerAmount = balance-sellAmount

  return <IndicativeQuote> {
    makerAssetData: assetDataUtils.encodeERC20AssetData(
      takerRequest.sellTokenAddress
    ),
    makerAssetAmount: new BigNumber(balance),
    takerAssetData: assetDataUtils.encodeERC20AssetData(
      takerRequest.buyTokenAddress
    ),
    takerAssetAmount: new BigNumber(sellAmount),
    expirationTimeSeconds: new BigNumber(Date.now()+10000000),
  };
}
