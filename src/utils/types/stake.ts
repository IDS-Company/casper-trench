export type Delegation = {
	total: number;
	data: DelegationData[];
};
export type DelegationData = {
	// hash: string;
	// unbonder_public_key: string;
	// validator_public_key: string;
	// amount: string;
	// status: boolean;
	// timestamp: number;
	// validator_name: string;
	// validator_icon: string;
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

export type Undelegation = {
	// delegator: string;
	// validator: string;
	// amount: string;
	// timestamp: string;
	// release_timestamp: number;
	// status: boolean;
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
