import { goto } from '$app/navigation';
import axios from 'axios';
import { notifyError } from './toast';
const casperStatsBaseURL = `${import.meta.env.VITE_CASPERSTATS_URL}`;
const art3misBaseURL = `${import.meta.env.VITE_ART3MIS_URL}`;
const csprFyiBaseURL = `${import.meta.env.VITE_CASPER_INFO_API_URL}`;
export const getEconomics = async () => {
	return await axios
		.get(`${casperStatsBaseURL}/info/economics`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch economics');
		});
};

export const getStats = async () => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/stats`);
		return res && res.data;
	} catch (error) {
		// notifyError('Could not fetch stats');
	}
};

export const getLatestBlocks = async (count: number) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/blocks/latest/${count}`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch latest blocks');
	}
};

export const getBlocks = async (startIndex: number, count: number) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/blocks`, { params: { startIndex, count } });
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch block range');
	}
};

export const getBids = async () => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/validators/bids`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch validators');
	}
};
export const getCurrentEraValidators = async () => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/validators/current-era`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch current era validators');
	}
};
export const getNextEraValidators = async () => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/validators/next-era`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch next era validators');
	}
};
export const getValidator = async (publicKey: string) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/validators/${publicKey}`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch validator details');
	}
};

export const getAccount = async (address: string) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/accounts/${address}`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch account details');
	}
};

export const getAccountBalance = async (address: string) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/accounts/${address}/balance`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch account balance');
	}
};
export const getType = async (address: string) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/accounts/${address}/type`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch account type');
	}
};

export const getValidatorBlocks = async (publicKey: string, count: number, startIndex: number) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/blocks/validator-blocks/${publicKey}`, {
			params: {
				startIndex,
				count
			}
		});
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch validators blocks');
	}
};
export const getValidatorDelegators = async (publicKey: string) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/validators/${publicKey}/delegators`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch validator delegators');
	}
};

export const getTopAccounts = async (startIndex: number, count: number) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/accounts/top-accounts`, {
			params: {
				startIndex,
				count
			}
		});
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch top accounts');
	}
};

export const getAccountTransfers = async (address: string, count: number, startIndex: number) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/accounts/${address}/transfers`, {
			params: {
				startIndex,
				count
			}
		});
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch account transfers');
	}
};

export const getAccountDeploys = async (address: string, count: number, startIndex: number) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/accounts/${address}/deploys`, {
			params: {
				startIndex,
				count
			}
		});
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch account transfers');
	}
};

export const getAccountDelegation = async (address: string) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/accounts/${address}/delegations`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch account delegations');
	}
};

export const getAccountUndelegations = async (address: string) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/accounts/${address}/undelegations`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch account undelegations');
	}
};

export const getAccountRewards = async (address: string, count: number, startIndex: number) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/accounts/${address}/rewards`, {
			params: {
				startIndex,
				count
			}
		});
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch account rewards');
	}
};

export const getAccountEraRewards = async (address: string) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/accounts/${address}/era-rewards`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch account era rewards');
	}
};

export const getTransactions = async (count: number, startIndex: number) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/deploys`, {
			params: {
				startIndex,
				count
			}
		});
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch deploys');
	}
};

export const getDeploy = async (hash: string) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/deploys/${hash}`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch deploy details');
	}
};

export const getBlock = async (address: string | number) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/blocks/from-chain/${address}`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch block details');
	}
};

export const getBlockTransfers = async (blockHash: string | number) => {
	// return await axios
	// 	.get(`${casperStatsBaseURL}/chain/get-block-transfers/${address}`)
	// 	.then((res) => {
	// 		return res.data;
	// 	})
	// 	.catch((err) => {
	// 		notifyError('Could not fetch block transfers');
	// 	});
	try {
		const res = await axios.get(`${csprFyiBaseURL}/blocks/${blockHash}/transfers`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch block transfers');
	}
};

export const getEraData = async (order: string, skip: number, limit: number) => {
	return await axios
		.get(`${art3misBaseURL}/era`, {
			params: {
				order,
				skip,
				limit
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch era data');
		});
};

export const getMarketPrices = async () => {
	return await axios
		.get(`${art3misBaseURL}/prices`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch market data');
		});
};

export const getTransferFlow = async (eraId: number, limit: number) => {
	return await axios
		.get(`${art3misBaseURL}/transfersByEraId`, {
			params: {
				eraId,
				limit
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			notifyError('Could not fetch market data');
		});
};

export const getVolumes = async (count: number) => {
	return await axios
		.get(`${casperStatsBaseURL}/info/get-transfer-volume/${count}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch transaction volumes');
		});
};

export const getDeployVolumes = async (days: number) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/deploys/volumes/${days}`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch volumes');
	}
};
export const getLatestChainState = async () => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/chain/latest-state`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch chain state');
	}
};
export const searchPhrase = async (address: string) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/search/${address}`);
		console.log(res.data);
		goto(res?.data?.endpoint);
	} catch (error) {
		notifyError('Sorry, nothing was found.');
	}
};
