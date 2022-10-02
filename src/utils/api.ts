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

// export const getStats = async () => {
// 	return await axios
// 		.get(`${casperStatsBaseURL}/info/get-stats`)
// 		.then((res) => {
// 			return res.data;
// 		})
// 		.catch((err) => {
// 			notifyError('Could not fetch stats');
// 		});
// };

export const getStats = async () => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/stats`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch stats');
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
		notifyError('Could not fetch next era validators');
	}
};

export const getAccount = async (address: string) => {
	return await axios
		.get(`${casperStatsBaseURL}/account/get-account/${address}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch account details');
		});
};
export const getType = async (address: string) => {
	return await axios
		.get(`${casperStatsBaseURL}/info/get-type/${address}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch type');
		});
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
		notifyError('Could not fetch next era validators');
	}
};
export const getValidatorDelegators = async (publicKey: string) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/validators/${publicKey}/delegators`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch next era validators');
	}
};

export const getTopAccounts = async (count: number, start: number) => {
	return await axios
		.get(`${casperStatsBaseURL}/account/get-rich-accounts`, {
			params: {
				count,
				start
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch top accounts');
		});
};

export const getAccountTransfers = async (account: string, count: number, start: number) => {
	return await axios
		.get(`${casperStatsBaseURL}/account/get-transfers`, {
			params: {
				account,
				count,
				start
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch account transfers');
		});
};

export const getAccountDeploys = async (account: string, count: number, start: number) => {
	return await axios
		.get(`${casperStatsBaseURL}/account/get-deploys`, {
			params: {
				account,
				count,
				start
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch account transactions');
		});
};

export const getAccountDelegation = async (account: string) => {
	return await axios
		.get(`${casperStatsBaseURL}/account/delegate`, {
			params: {
				account
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch account staking delegations');
		});
};

export const getAccountUndelegations = async (account: string, count: number, start: number) => {
	return await axios
		.get(`${casperStatsBaseURL}/account/undelegate`, {
			params: {
				account,
				count,
				start
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch account staking undelegations');
		});
};

export const getAccountRewards = async (account: string, count: number, start: number) => {
	return await axios
		.get(`${casperStatsBaseURL}/account/get-rewards`, {
			params: {
				account,
				count,
				start
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch account earnings');
		});
};

export const getAccountEraRewards = async (account: string, count: number) => {
	return await axios
		.get(`${casperStatsBaseURL}/account/get-era-reward`, {
			params: {
				account,
				count
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch account era earnings');
		});
};

export const getTransactions = async (count: number, start: number) => {
	return await axios
		.get(`${casperStatsBaseURL}/chain/get-latest-txs`, {
			params: {
				count,
				start
			}
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch transactions');
		});
};

export const getDeploy = async (address: string) => {
	return await axios
		.get(`${casperStatsBaseURL}/info/get-deploy/${address}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch transactions details');
		});
};

export const getBlock = async (address: string | number) => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/deploys/volumes`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not block');
	}
};

export const getBlockTransfers = async (address: string | number) => {
	return await axios
		.get(`${casperStatsBaseURL}/chain/get-block-transfers/${address}`)
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			notifyError('Could not fetch block transfers');
		});
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

export const getDeployVolumes = async () => {
	try {
		const res = await axios.get(`${csprFyiBaseURL}/deploys/volumes`);
		return res && res.data;
	} catch (error) {
		notifyError('Could not fetch volumes');
	}
};
