import { isLoading } from '$stores/loading';
// import { CasperServiceByJsonRPC, type GetDeployResult } from 'casper-js-sdk';
import type { Transaction } from '$utils/types/transaction';
import { get } from 'svelte/store';
import { getCurrentBlockHeight } from './blocks';
import { parseStringValue } from '$utils/converters';
import { browser } from '$app/env';
import { rpcUrl } from '$stores/chain';

export const getDeploy = async (address: string) => {
	const { CasperServiceByJsonRPC } = browser && window.CasperSDK;
	const casperService = new CasperServiceByJsonRPC(get(rpcUrl));
	return await casperService.getDeployInfo(address).catch((err) => {
		console.log('Cannot get deploy: ', err);
	});
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
	isLoading.set(true);
	const currentHeight = await getCurrentBlockHeight();
	const { CasperServiceByJsonRPC } = browser && window.CasperSDK;
	const casperService = new CasperServiceByJsonRPC(get(rpcUrl));
	let deployHashes: string[] = [];
	for (let i = currentHeight; i > currentHeight - 50; i--) {
		await casperService.getBlockInfoByHeight(i).then((getBlockResult) => {
			const { block } = getBlockResult;
			block.body.deploy_hashes.forEach((hash) => {
				deployHashes.push(hash);
				// browser && console.log(hash);
			});
		});
	}

	let transactions: Transaction[] = [];
	for (const hash of deployHashes) {
		// @ts-ignore
		const deployResult = await getDeploy(hash);
		transactions.push({
			deployHash: deployResult.deploy.hash,
			timestamp: Date.parse(deployResult.deploy?.header?.timestamp),
			fromAddress: deployResult.deploy?.header?.account,
			toAddress: deployResult.deploy?.session?.Transfer?.args[1]?.[1]?.parsed,
			value: parseStringValue(deployResult.deploy?.session?.StoredContractByHash.args[2][1].parsed),
			fee: parseStringValue(deployResult?.execution_results[0].result.Success.cost),
			fromBalance: 0,
			toBalance: 0,
			blockHash: deployResult?.execution_results[0].block_hash,
			publicKey: deployResult.deploy?.header?.account
		});
		// console.log(deploy)
	}
	console.table(transactions);
	isLoading.set(false);
	return transactions;
};
