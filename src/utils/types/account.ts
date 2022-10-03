export type TopAccount = {
	publicKey: string;
	accountHash: string;
	activeDate: Date;
	transferrable: number;
	stakedAmount: number;
	balance: number;
	transactionCount: number;
	rank?: number;
};

export type Account = {
	publicKey?: string;
	accountHash?: string;
	addressType?: string;
	availableBalance?: number;
	totalBalance?: number;
	totalStaked?: number;
	unstaking?: number;
	totalReward?: number;
};
// export type Account = {
// 	account_hash: string;
// 	public_key_hex: string;
// 	balance: string;
// 	active_date: string;
// 	name: string;
// 	transferrable: string;
// 	total_staked: string;
// 	total_reward: string;
// 	unbonding: string;
// };
