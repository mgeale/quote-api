import {getContractConnection} from '../connections/contract';

export async function getBalance(contractAddress: string, walletAddress: string) {
    let contract = getContractConnection(contractAddress);
    return contract.methods.balanceOf(walletAddress).call();
}
