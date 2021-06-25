console.log('loading globals.js');

import dotenv from 'dotenv'
dotenv.config( {
  path: `${process.env.PWD}/.env`
} );


settings = (key) => Settings.findOne({key});

const Minio = require('minio')

minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'accesskey',
    secretKey: 'secretkey'
});


const ethers = require('ethers');

eth = {}
eth.provider = new ethers.providers.JsonRpcProvider(settings('gif.http_provider'));

eth.provider.getBlockNumber()
.then((res) => {
	info(`Connected to ethereum node, blocknumber: ${res}`);
})
.catch((err) => {
	error(`Could not connect to ethereum node, err=${err.message}`, {message: err.message, stack: err.stack});
});

eth.wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC).connect(eth.provider)

eth.blockTimestamp = Meteor.wrapAsync(async (blockNumber, done) => {
	
	try {
		const block = await eth.provider.getBlock(blockNumber);
		done(null, block.timestamp * 1000);
	} catch (err) {
		done(err, null);
	}
});

eth.transactionTimestamp = Meteor.wrapAsync(async (tx, done) => {
	
	try {
		const transaction = await eth.provider.getTransaction(tx);
		done(null, eth.blockTimestamp(transaction.blockNumber));
	} catch (err) {
		done(err, null);
	}
	
});

contracts = {}; // global contracts object

getContract = (contractName, mode) => {
		
	if (contracts[contractName]) {
		return contracts[contractName];
	}
	
	const contractConfig = Contracts.findOne({name: contractName});
	if (!contractConfig) {
		error(`Contract ${contractName} not found!`);
		return;
	}

	const Contract = new ethers.Contract(
		contractConfig.address, 
		contractConfig.abi, 
		eth.wallet
	);		
	
	contracts[contractName] = Contract
	
	return Contract;
}


/*
 *
 *	Formating utilities
 *
 */

b32s = (b32) => {
	return ethers.utils.parseBytes32String(b32);
}

s32b = (text) => {
	return ethers.utils.formatBytes32String(text.slice(0,31))
}

unix2Date = (unixDate) => {
	
	return new Date(unixDate * 1000);
}

toEther = (wei) => Math.round(ethers.utils.formatEther(wei) * 100.0) / 100.0;

