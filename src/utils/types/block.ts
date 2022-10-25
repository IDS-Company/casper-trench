export type Block = {
	blockHeight: number;
	blockHash: string;
	eraID: number;
	transactions: number;
	deploys: number;
	timestamp: Date;
	hash: string;
	validatorPublicKey: string;
	stateRootHash?: string;
	isSwitchBlock: boolean;
	proofs?: any[];
};
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
