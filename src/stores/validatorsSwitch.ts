import type { Bid } from '$utils/types/validator';
import { writable } from 'svelte/store';

export const currentPage = writable(0);
export const eraValidators = writable<Partial<Bid[]>>([]);
export const bidValidators = writable<Bid[]>([]);
export const showSwitch = writable<boolean>(true);
