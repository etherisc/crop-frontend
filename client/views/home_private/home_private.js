Template.HomePrivate.onCreated(function() {
	
});

Template.HomePrivate.onDestroyed(function() {
	
});

Template.HomePrivate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePrivate.events({
	
});

Template.HomePrivate.helpers({
	
});

Template.HomePrivateKeyVisual.created = function() {

};

Template.HomePrivateKeyVisual.destroyed = function() {

};

Template.HomePrivateKeyVisual.rendered = function() {

};

Template.HomePrivateKeyVisual.helpers({

});

Template.HomePrivateKeyVisual.events({

});
