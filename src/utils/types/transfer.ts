export type Transfer = {
	deployHash: string;
	amount: number;
	blockHash: string;
	cost: number;
	deployType: string;
	entryPoint: string;
	fromAccountHash: string;
	publicKey: string;
	status: string;
	timestamp: string;
	toAccountHash: string;
	validator: string;
};

export type BlockTransfer = {
	deploy_hash: string;
	from: string;
	to: string;
	source: string;
	target: string;
	amount: number;
	gas: string;
	id: any;
};

export type TransferFlow = {
	eraId: number;
	eraStart: string;
	eraEnd: string;
	transfers: {
		id: number;
		timestamp: string;
		depth: number;
		approved: boolean;
		blockHeight: number;
		eraId: number;
		deployHash: string;
		from: string;
		fromHash: string;
		to: string;
		toHash: string;
		amount: string;
		denomAmount: number;
	}[];
	count: number;
};
