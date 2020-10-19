import Web3 from 'web3';

let connectionIfExists: Web3 | undefined;

export function getWeb3Connection(): Web3 {
  if (!connectionIfExists) {
    throw new Error('Web3 connection not initialized');
  }
  return connectionIfExists;
}

export async function initWeb3ConnectionAsync(url: string): Promise<void> {
  if (connectionIfExists) {
    throw new Error('Web3 connection already exists');
  }
  connectionIfExists = new Web3(url);
}