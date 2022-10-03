export type AccountTransaction = {
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
export type Transaction = {
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

export type TransactionDetail = {
	api_version: string;
	deploy: {
		approvals: {
			signature: string;
			signer: string;
		}[];
		hash: string;
		header: {
			account: string;
			body_hash: string;
			chain_name: string;
			dependencies: any[];
			gas_price: number;
			timestamp: string;
			ttl: string;
			block_hash: string;
			block_height: number;
			cost: string;
			type: string;
		};
		payment: {
			moduleBytes: {
				args: any[];
				module_bytes: string;
			};
		};
		session: {
			Transfer: {
				args: any[];
			};
		};
	};
	execution_results: {
		block_hash: string;
		result: {
			Success: {
				cost: string;
				effect: {
					operations: any[];
					transforms: {
						key: string;
						transform: string;
					}[];
				};
				transfers: string[];
			};
		};
	}[];
};
