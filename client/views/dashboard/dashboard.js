Template.Dashboard.onCreated(function() {
	
});

Template.Dashboard.onDestroyed(function() {
	
});

Template.Dashboard.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Dashboard.events({
	
});

Template.Dashboard.helpers({
	
});

