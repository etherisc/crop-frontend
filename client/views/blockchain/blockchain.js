Template.Blockchain.onCreated(function() {
	
});

Template.Blockchain.onDestroyed(function() {
	
});

Template.Blockchain.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Blockchain.events({
	
});

Template.Blockchain.helpers({
	
});

Template.BlockchainHeader.created = function() {

};

Template.BlockchainHeader.destroyed = function() {

};

Template.BlockchainHeader.rendered = function() {

};

Template.BlockchainHeader.helpers({

});

Template.BlockchainHeader.events({

});


Template.BlockchainSignatureComponent.created = function() {

};

Template.BlockchainSignatureComponent.destroyed = function() {

};

Template.BlockchainSignatureComponent.rendered = function() {

};

Template.BlockchainSignatureComponent.helpers({
	"IsMetamaskConnected": function() {
		return (account.get() !== '');
	}
});

Template.BlockchainSignatureComponent.events({

	"click #btn-connect": function(e, t) {
		e.preventDefault();
		connectMetamask();
	},

	"click #btn-send-tx": function(e, t) {
		e.preventDefault();
		signMessage('This is the message');
	}

});
