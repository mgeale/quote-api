import { GanacheSubprovider, MnemonicWalletSubprovider, RPCSubprovider, Web3ProviderEngine } from '@0x/subproviders';
import { providerUtils } from '@0x/utils';

import { BASE_DERIVATION_PATH, GANACHE_CONFIGS, MNEMONIC, NETWORK_CONFIGS } from '../configs';

export const mnemonicWallet = new MnemonicWalletSubprovider({
    mnemonic: MNEMONIC,
    baseDerivationPath: BASE_DERIVATION_PATH,
});

const determineProvider = (): Web3ProviderEngine => {
    const pe = new Web3ProviderEngine();
    pe.addProvider(mnemonicWallet);
    /*if (NETWORK_CONFIGS === GANACHE_CONFIGS) {
        pe.addProvider(
            new GanacheSubprovider({
                vmErrorsOnRPCResponse: true,
                network_id: GANACHE_CONFIGS.networkId,
                mnemonic: MNEMONIC,
            }),
        );
    } else {*/
        pe.addProvider(new RPCSubprovider(NETWORK_CONFIGS.rpcUrl));
    //}sub
    providerUtils.startProviderEngine(pe);
    return pe;
};

let connectionIfExists: Web3ProviderEngine | undefined;

export function getProvider(): Web3ProviderEngine {
  if (!connectionIfExists) {
    throw new Error('Web3ProviderEngine connection not initialized');
  }
  return connectionIfExists;
}

export async function initProviderAsync(): Promise<void> {
  if (connectionIfExists) {
    throw new Error('Web3ProviderEngine connection already exists');
  }
  connectionIfExists = determineProvider();
}