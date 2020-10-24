import { TakerRequest, IndicativeQuote } from '@0x/quote-server';
import { BigNumber } from '@0x/utils';
import { assetDataUtils } from '@0x/order-utils';
import {getPrice} from '../lib/price';
import {MAKER_WALLET} from '../constants';
import { getProvider } from '../connections/providerEngine';
import { ContractWrappers, ERC20TokenContract } from '@0x/contract-wrappers';

export default async function fetchIndicativeQuoteAsync(
  takerRequest: TakerRequest
): Promise<IndicativeQuote | undefined> {

  const providerEngine = getProvider();

  const tokenAddress = new ERC20TokenContract(takerRequest.sellTokenAddress, providerEngine);

  const balanceAsync = tokenAddress.balanceOf(MAKER_WALLET).callAsync();
  const priceAsync = {[takerRequest.sellTokenAddress]: 1, [takerRequest.buyTokenAddress]: 2}//getPrice(takerRequest.buyTokenAddress, takerRequest.sellTokenAddress);
  const [balance, prices] = await Promise.all([balanceAsync, priceAsync]);

  const price = prices[takerRequest.sellTokenAddress]/prices[takerRequest.buyTokenAddress]
  if (!price || balance == new BigNumber(0)) return;
  const sellAmount = takerRequest.sellAmountBaseUnits.multipliedBy(price);
  const takerAmount = balance > sellAmount ? sellAmount : balance;

  return <IndicativeQuote> {
    makerAssetData: assetDataUtils.encodeERC20AssetData(
      takerRequest.sellTokenAddress
    ),
    makerAssetAmount: new BigNumber(balance),
    takerAssetData: assetDataUtils.encodeERC20AssetData(
      takerRequest.buyTokenAddress
    ),
    takerAssetAmount: new BigNumber(takerAmount),
    expirationTimeSeconds: new BigNumber(Date.now()+10000000),
  };
}
