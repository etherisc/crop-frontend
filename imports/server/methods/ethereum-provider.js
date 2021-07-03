console.log('loading ethereum-provider.js');

import { settings } from '/imports/server/methods/settings.js';

const ethers = require('ethers');

const eth = {}

try {

	const provider = new ethers.providers.JsonRpcProvider(settings('gif.http_provider'));

	provider.getBlockNumber()
	.then((res) => {
		info(`Connected to ethereum node, blocknumber: ${res}`);
	})
	.catch((err) => {
		error(`Could not connect to ethereum node, err=${err.message}`, {message: err.message, stack: err.stack});
	});

	const wallet = ethers.Wallet.fromMnemonic(settings('gif.mnemonic').connect(eth.provider)

	const blockTimestamp = Meteor.wrapAsync(async (blockNumber, done) => {

		try {
			const block = await eth.provider.getBlock(blockNumber);
			done(null, block.timestamp * 1000);
		} catch (err) {
			done(err, null);
		}
	});

	const transactionTimestamp = Meteor.wrapAsync(async (tx, done) => {

		try {
			const transaction = await eth.provider.getTransaction(tx);
			done(null, eth.blockTimestamp(transaction.blockNumber));
		} catch (err) {
			done(err, null);
		}

	});

	eth.b32s = (b32) => ethers.utils.parseBytes32String(b32);
	eth.s32b = (text) => ethers.utils.formatBytes32String(text.slice(0,31))
	eth.ethers = ethers;
	eth.provider = provider;
	eth.wallet = wallet;
	eth.blockTimestamp = blockTimestamp;
	eth.transactionTimestamp = transactionTimestamp;
	
} catch (err) {

	error('Could not connect to Ethereum Node', {message: err.message, stack: err.stack});
	eth.provider = null;
	eth.wallet = null;

}

module.exports = { eth };
