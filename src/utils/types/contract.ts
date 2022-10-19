export type Contract = {
	contractHash: string;
	contractPackageHash: string;
	contractWasmHash: string;
	namedKeys: any[];
	entryPoints: any[];
	contractPackage?: any;
	protocolVersion: string;
	name: string;
	contractType: string;
	owner: string;
	deploys: number;
	rawData: {};
	timestamp: Date;
};
