import {Contract} from 'web3-eth-contract';
import {getWeb3Connection} from './web3';

let minABI = JSON.parse(`[
    {
      "constant":true,
      "inputs":[{"name":"_owner","type":"address"}],
      "name":"balanceOf",
      "outputs":[{"name":"balance","type":"uint256"}],
      "type":"function"
    },
    {
      "constant":true,
      "inputs":[],
      "name":"decimals",
      "outputs":[{"name":"","type":"uint8"}],
      "type":"function"
    }
  ]`);

let connectionIfExists;

export function getContractConnection(): Contract {
  if (!connectionIfExists) {
    throw new Error('Contract connection not initialized');
  }
  return connectionIfExists;
}

export async function initContractConnectionAsync(address: string): Promise<void> {
  if (connectionIfExists) {
    throw new Error('Contract connection already exists');
  }
  const web3 = getWeb3Connection();
  connectionIfExists = new web3.eth.Contract(minABI, address);
}