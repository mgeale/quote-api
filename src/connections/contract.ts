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


let contractConnections = {};

export function getContractConnection(contractAddress: string): Contract {
  if (!contractConnections[contractAddress]) {
    throw new Error('Contract connection not initialized');
  }
  return contractConnections[contractAddress];
}

export async function initContractConnectionAsync(contractAddress: string): Promise<void> {
  if (Object.keys(contractConnections).length > 0) {
    throw new Error('Contract connection already exists');
  }
  const web3 = getWeb3Connection();
  Object.assign(contractConnections, {
    [contractAddress]: new web3.eth.Contract(minABI, contractAddress)
  });
}