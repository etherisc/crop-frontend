console.log('loading ethereum-provider.js');

import { settings } from '/imports/server/methods/settings.js';

const ethers = require('ethers');

let providerStore = null;
let walletStore = null;

const provider = () => {
	if (providerStore) return providerStore;
	try {
		const provider = new ethers.providers.JsonRpcProvider(settings('gif.http_provider'));
		info('Provider connected');
		providerStore = provider;
		return provider;
	} catch ({message, stack}) {
		error('Could not connect to Ethereum Node', {message, stack});
	}
};

const wallet = () => {
	if (walletStore) return walletStore;
	try {
		const wallet = ethers.Wallet.fromMnemonic(settings('gif.mnemonic')).connect(eth.provider());
		info('Wallet connected', wallet);
		walletStore = wallet;
		return wallet;
	} catch ({message, stack}) {
		error('Could not create Signer', {message, stack});			
	}
}


const blockTimestamp = async (blockNumber) => {

	const block = await eth.provider().getBlock(blockNumber);
	return block.timestamp * 1000;
};

const transactionTimestamp = async (tx) => {

	const transaction = await eth.provider().getTransaction(tx);
	return await eth.blockTimestamp(transaction.blockNumber);
};


const b32s = (b32) => ethers.utils.parseBytes32String(b32);
const s32b = (text) => ethers.utils.formatBytes32String(text.slice(0,31));

eth = {
	ethers, 
	blockTimestamp,
	provider, 
	wallet,
	transactionTimestamp,
	b32s, 
	s32b
};

const Gif = require('@etherisc/gif-connect');
const gif = new Gif.instance(settings('gif.http_provider'),	settings('gif.product.address'));

module.exports = { eth, gif };
