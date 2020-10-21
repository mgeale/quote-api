import { TakerRequest, FirmQuote } from '@0x/quote-server';
import { Order, signatureUtils } from '@0x/order-utils';
import { MAKER_WALLET } from '../constants';

import { GanacheSubprovider, MnemonicWalletSubprovider, RPCSubprovider, Web3ProviderEngine } from '@0x/subproviders';


export async function fetchFirmQuoteAsync(
  takerRequest: TakerRequest
): Promise<FirmQuote | undefined> {

  /*const order: Order = {
    chainId: NETWORK_CONFIGS.chainId,
    exchangeAddress,
    makerAddress: maker,
    takerAddress: NULL_ADDRESS,
    senderAddress: NULL_ADDRESS,
    feeRecipientAddress: NULL_ADDRESS,
    expirationTimeSeconds: randomExpiration,
    salt: generatePseudoRandomSalt(),
    makerAssetAmount,
    takerAssetAmount,
    makerAssetData,
    takerAssetData,
    makerFeeAssetData: NULL_BYTES,
    takerFeeAssetData: NULL_BYTES,
    makerFee: ZERO,
    takerFee: ZERO,
};*/

  //signed order
  // const signedOrder = await signatureUtils.ecSignOrderAsync(providerEngine, order, MY_WALLET);

  return <FirmQuote> {

  };
}
