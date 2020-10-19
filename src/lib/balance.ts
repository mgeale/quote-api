import {getContractConnection} from '../connections/contract';

export async function getBalance(address: string) {
    let contract = getContractConnection();
    return contract.methods.balanceOf(address).call();
}
