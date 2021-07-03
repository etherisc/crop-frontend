console.log('loading utils.js');

const ethers = require('ethers');

/*
 *
 *	Formating utilities
 *
 */


unix2Date = (unixDate) => {

	return new Date(unixDate * 1000);
}

toEther = (wei) => Math.round(ethers.utils.formatEther(wei) * 100.0) / 100.0;

