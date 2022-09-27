// export type Stats = {
// 	circulating: string;
// 	circulating_change: number;
// 	holders: number;
// 	holders_change: number;
// 	marketcap: number;
// 	marketcap_change: number;
// 	price: number;
// 	price_change: number;
// 	total_supply: string;
// 	total_supply_change: number;
// 	transactions: number;
// 	transactions_change: number;
// 	transfers: [];
// 	validators: number;
// 	validators_change: number;
// };

export type Stats = {
	currentBlockHeight: number;
	currentBlockTime: string;
	currentPrice: number;
	marketCap: number;
	circulatingSupply: number;
	totalSupply: number;
	activeValidators: number;
	activeBids: number;
	totalStakeBonded: number;
	apy: number;
	totalTransfers: number;
};
