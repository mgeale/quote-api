interface NetworkSpecificConfigs {
    rpcUrl: string;
    networkId: number;
    chainId: number;
}

import { GANACHE_NETWORK_ID, KOVAN_NETWORK_ID, RINKEBY_NETWORK_ID, ROPSTEN_NETWORK_ID, MAINNET_NETWORK_ID } from './constants';

export const TX_DEFAULTS = { gas: 800000, gasPrice: 1000000000 };
export const MNEMONIC = 'concert load couple harbor equip island argue ramp clarify fence smart topic';
export const BASE_DERIVATION_PATH = `44'/60'/0'/0`;
export const GANACHE_CONFIGS: NetworkSpecificConfigs = {
    rpcUrl: 'http://127.0.0.1:8545',
    networkId: GANACHE_NETWORK_ID,
    chainId: 1337,
};
export const KOVAN_CONFIGS: NetworkSpecificConfigs = {
    rpcUrl: 'https://kovan.infura.io/',
    networkId: KOVAN_NETWORK_ID,
    chainId: KOVAN_NETWORK_ID,
};
export const ROPSTEN_CONFIGS: NetworkSpecificConfigs = {
    rpcUrl: 'https://ropsten.infura.io/',
    networkId: ROPSTEN_NETWORK_ID,
    chainId: ROPSTEN_NETWORK_ID,
};
export const RINKEBY_CONFIGS: NetworkSpecificConfigs = {
    rpcUrl: 'https://rinkeby.infura.io/',
    networkId: RINKEBY_NETWORK_ID,
    chainId: RINKEBY_NETWORK_ID,
};
export const MAINNET_CONFIGS: NetworkSpecificConfigs = {
    rpcUrl: 'https://mainnet.infura.io/v3/3dcd0498b23141808ec76afa97cf2bda',
    networkId: MAINNET_NETWORK_ID,
    chainId: MAINNET_NETWORK_ID,
};
export const NETWORK_CONFIGS = MAINNET_CONFIGS;