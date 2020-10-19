export async function getPrice() {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xe41d2489571d322189246dafa5ebde1f4699f498&vs_currencies=usd");
    const price = await response.json();
    return price["0xe41d2489571d322189246dafa5ebde1f4699f498"]["usd"];
}
