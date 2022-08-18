export type AccountTransaction = {
	deploy_hash: string;
	hash: string;
	timestamp: string;
	public_key: string;
	gas_price: number;
	cost: string;
	status: string;
	account_balance: string;
	type: string;
	amount: string;
};
export type Transaction = {
	deployHash: string;
	timestamp: number;
	fromAddress: string;
	toAddress: string;
	value: number;
	fee: number;
	fromBalance: number;
	toBalance: number;
	blockHash: string;
	publicKey: string;
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
