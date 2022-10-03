export type Block = {
	height: number;
	eraID: number;
	transactions: number;
	timestamp: number;
	hash: string;
	validatorPublicKey: string;
	stateRootHash?: string;
	proofs?: any[];
};
// export type DBBlock = {
// 	blockHeight: number;
// 	blockHash: string;
// 	eraID: number;
// 	transfers: number;
// 	deploys: number;
// 	timestamp: Date;
// 	isSwitchBlock: boolean;
// 	validatorPublicKey: string;
// };
export type ProposerBlocks = {
	hash: string;
	height: number;
	timestamp: string;
	era: number;
	deploys: number;
	transfers: number;
};

// export type RangeBlock = {
// 	current_height: number;
// 	result: Block[];
// };

export type BlockDetail = {
	jsonrpc: string;
	id: number;
	result: {
		api_version: string;
		block: Block;
		current_height: number;
	};
};
