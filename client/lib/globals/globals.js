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

function TxtOverlay(pos, txt, cls, map) {

	// Now initialize all properties.
	this.pos = pos;
	this.txt_ = txt;
	this.cls_ = cls;
	this.map_ = map;

	// We define a property to hold the image's
	// div. We'll actually create this div
	// upon receipt of the add() method so we'll
	// leave it null for now.
	this.div_ = null;

	// Explicitly call setMap() on this overlay
	this.setMap(map);
}

TxtOverlay.prototype = new google.maps.OverlayView();



TxtOverlay.prototype.onAdd = function() {

	// Note: an overlay's receipt of onAdd() indicates that
	// the map's panes are now available for attaching
	// the overlay to the map via the DOM.

	// Create the DIV and set some basic attributes.
	var div = document.createElement('DIV');
	div.className = this.cls_;

	div.innerHTML = this.txt_;

	// Set the overlay's div_ property to this DIV
	this.div_ = div;
	var overlayProjection = this.getProjection();
	var position = overlayProjection.fromLatLngToDivPixel(this.pos);
	div.style.left = position.x + 'px';
	div.style.top = position.y + 'px';
	// We add an overlay to a map via one of the map's panes.

	var panes = this.getPanes();
	panes.floatPane.appendChild(div);
}

TxtOverlay.prototype.draw = function() {


	var overlayProjection = this.getProjection();

	// Retrieve the southwest and northeast coordinates of this overlay
	// in latlngs and convert them to pixels coordinates.
	// We'll use these coordinates to resize the DIV.
	var position = overlayProjection.fromLatLngToDivPixel(this.pos);


	var div = this.div_;
	div.style.left = position.x + 'px';
	div.style.top = position.y + 'px';

}

//Optional: helper methods for removing and toggling the text overlay.  
TxtOverlay.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
}

TxtOverlay.prototype.hide = function() {
	if (this.div_) {
		this.div_.style.visibility = "hidden";
	}
}

TxtOverlay.prototype.show = function() {
	if (this.div_) {
		this.div_.style.visibility = "visible";
	}
}

TxtOverlay.prototype.toggle = function() {
	if (this.div_) {
		if (this.div_.style.visibility == "hidden") {
			this.show();
		} else {
			this.hide();
		}
	}
}

TxtOverlay.prototype.toggleDOM = function() {
	if (this.getMap()) {
		this.setMap(null);
	} else {
		this.setMap(this.map_);
	}
}



