export async function getPrice(...contractAddresses: string[]) {
    const usd = 'usd';
    const url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${contractAddresses.join(',')}&vs_currencies=${usd}`
    const response = await fetch(url);
    const price = await response.json();
    const target = {};
    for (const address of contractAddresses) {
        Object.assign(target, {[address]: price[address][usd]});
    }
    return target;
}