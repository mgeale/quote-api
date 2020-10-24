import { ContractWrappers, ERC20TokenContract, OrderStatus } from '@0x/contract-wrappers';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { TakerRequest, FirmQuote } from '@0x/quote-server';
import { Order, signatureUtils } from '@0x/order-utils';
import { MAKER_WALLET } from '../constants';
import { BigNumber, providerUtils } from '@0x/utils';
import { DECIMALS, ZERO, NULL_BYTES, NULL_ADDRESS} from '../constants';

import { MnemonicWalletSubprovider, RPCSubprovider, Web3ProviderEngine } from '@0x/subproviders';
import {GANACHE_CONFIGS, MNEMONIC, BASE_DERIVATION_PATH} from '../configs';
import { getProvider } from '../connections/providerEngine';

export const mnemonicWallet = new MnemonicWalletSubprovider({
  mnemonic: MNEMONIC,
  baseDerivationPath: BASE_DERIVATION_PATH,
});

export async function fetchFirmQuoteAsync(
  takerRequest: TakerRequest
): Promise<FirmQuote | undefined> {

  const pe = getProvider();

  const contractWrappers = new ContractWrappers(pe, { chainId: 1337 });
  const exchangeAddress = contractWrappers.contractAddresses.exchange;

  const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(takerRequest.sellAmountBaseUnits, DECIMALS);
  const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(1), DECIMALS);

  const makerAssetData = await contractWrappers.devUtils.encodeERC20AssetData(takerRequest.sellTokenAddress).callAsync();
  const takerAssetData = await contractWrappers.devUtils.encodeERC20AssetData(takerRequest.buyTokenAddress).callAsync();

  const order: Order = {
    chainId: 1,
    exchangeAddress,
    makerAddress: MAKER_WALLET,
    takerAddress: takerRequest.takerAddress,
    senderAddress: NULL_ADDRESS,
    feeRecipientAddress: NULL_ADDRESS,
    expirationTimeSeconds: new BigNumber(0),
    salt: new BigNumber(0),
    makerAssetAmount,
    takerAssetAmount,
    makerAssetData,
    takerAssetData,
    makerFeeAssetData: NULL_BYTES,
    takerFeeAssetData: NULL_BYTES,
    makerFee: ZERO,
    takerFee: ZERO,
  };

  const signedOrder = await signatureUtils.ecSignOrderAsync(pe, order, MAKER_WALLET);

  return <FirmQuote> {
    signedOrder
  };
}
