Template.HomePublic.onCreated(function() {
	
});

Template.HomePublic.onDestroyed(function() {
	
});

Template.HomePublic.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePublic.events({
	
});

Template.HomePublic.helpers({
	
});

Template.HomePublicHomeJumbotron.onCreated(function() {
	
});

Template.HomePublicHomeJumbotron.onDestroyed(function() {
	
});

Template.HomePublicHomeJumbotron.onRendered(function() {
	if (!Meteor.userId()) {
	Router.go('/login');
} else {
	Router.go('home_private');
}


});

Template.HomePublicHomeJumbotron.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("login", {});
	}
	
});

Template.HomePublicHomeJumbotron.helpers({
	
});
