import { ethers } from 'ethers';

account = new ReactiveVar('');
provider = new ReactiveVar({});

setAccount = function (acc){
	account.set(acc);
}


contractAbi = [
	{
		"type":"function",
	 	"stateMutability":"nonpayable",
		"outputs":[],
		"name":"notarize",
		"inputs":[
			{"type":"string","name":"_auditType","internalType":"string"},
			{"type":"string","name":"_message","internalType":"string"},
			{"type":"string","name":"_user","internalType":"string"},
			{"type":"bytes32","name":"_hash","internalType":"bytes32"}
		]
	}
];


acreContract = null;
// acreAddress = "0x34Ff840808E4738863430542Dc7BB6FE0C63Bc6B";
acreAddress = "0x9ED89E55a9Dcf1bfE92DD21E89907D81F927E2aE";

connectMetamask = function (cb){
	if (ethereum) {
		ethereum
		.request({method: 'eth_requestAccounts'})
		.then(r => {
			setAccount(r[0]);
			provider.set(new ethers.providers.Web3Provider(ethereum));
			acreContract = new ethers.Contract( acreAddress, contractAbi , provider.get().getSigner());
			if (cb) {
				cb();
			}
		})
		.catch((err) => {
			console.log(err);
			setAccount('');
			alert('Connection denied by user.');
		});
		
	} else {
		alert('Please install Metamask');
	}
};


isMetamaskConnected = function() {
		return (account.get() !== '');
}
	

notarize = function (type, message, payload, updateMethod) {
	
	function sign() {

		var hash = ethers.utils.id(JSON.stringify(payload));
		var user = Meteor.user().profile.name;
		
		acreContract.notarize(type, message, user, hash)
		.then(res => {
			
			alert('Transaction submitted, TxHash: ' + res.hash.slice(7) + '...');

			var values = {
				is_signed: true,
				tx_hash: res.hash
			};

			Meteor.call(updateMethod, payload._id, values, function(err, res) {
				if(err) {
					alert(err.message);
				}
			});

			Meteor.call("auditTrailInsert", {type, message, user, hash: res.hash}, function(err, res) {
				if(err) {
					alert(err.message);
				}
			});

		})
		.catch(err => {
			alert(err.message);
		});
	}		
	
	if (!isMetamaskConnected()) { 
		connectMetamask(sign);
	} else {
		sign();
	}
		
}

// GoogleMaps.load({ v: '3', key: 'AIzaSyAIjsbPvYSEBicJeKvPeI679eS9VW3w5zg', libraries: 'places' });
GoogleMaps.load({ v: '3', key: 'AIzaSyAuGOT9cn2Rp8O4gicXER-clMjVBMszlyY', libraries: 'places' });

round = (num, places) => Math.round(Math.sign(num) * (Math.abs(num) + Number.EPSILON) * 10**places) / 10**places;

latLng2Pixel = function ({ lat, lng }) => ( ( round( lng, 1 ) + 40.1 ) * 1000 + round( lat, 1 ) + 20.1 ) * 10;
pixel2LatLng = function ( pixel ) => {
     lat: ( ( pixel - trunc( pixel / 1000 ) * 1000 ) / 10 ) - 20.1,
     lng: ( trunc( pixel / 1000 ) / 10 ) - 40.1
}

