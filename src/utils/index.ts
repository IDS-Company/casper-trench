import { browser } from '$app/env';
import { price } from '$stores/price';
import { getBids } from './api';
import type { Bid } from './types/validator';

export const setCSPRPrice = async () => {
	// @ts-ignore
	const casperInformation = await new window.CoinGecko().coins.fetch('casper-network', {});
	price.set(casperInformation.data.market_data.current_price.usd);
};

export const setValidatorsInfo = async () => {
	try {
		const validators: Bid[] = await getBids();
		let validatorsInfo = [];

		validators?.forEach((validator) => {
			validatorsInfo.push({ publicKey: validator.publicKey, information: validator.information });
		});
		browser && window.localStorage.setItem('validatorsInfo', JSON.stringify(validatorsInfo));
	} catch (error) {}
};
