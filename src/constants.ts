import { BigNumber } from '@0x/utils';

export const REDIS_URL = 'redis://127.0.0.1:6379';
export const REDIS_PREFIX = '__prefix:';

export enum TOKEN_ADDRESS {
    DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    WETH = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    ZRX = '0xe41d2489571d322189246dafa5ebde1f4699f498',
    ENS = '0xfac7bea255a6990f749363002136af6556b31e04',
    ATOM = '0xbdaed67214641b7eda3bf8d7431c3ae5fc46f466',
}

// export const MAKER_WALLET = '0x34d817421463fFD7cd2cB8eff2533A1D31df638b';
export const MAKER_WALLET = '0x5409ED021D9299bf6814279A6A1411A7e866A631';

export const RPC_URL = 'wss://mainnet.infura.io/ws/v3/3dcd0498b23141808ec76afa97cf2bda';

export const DECIMALS = 18;
export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000';
export const NULL_BYTES = '0x';
export const ZERO = new BigNumber(0);
export const GANACHE_NETWORK_ID = 50;
export const KOVAN_NETWORK_ID = 42;
export const ROPSTEN_NETWORK_ID = 3;
export const RINKEBY_NETWORK_ID = 4;
export const MAINNET_NETWORK_ID = 4;