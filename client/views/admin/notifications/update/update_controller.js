this.AdminNotificationsUpdateController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminNotificationsUpdate': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("notification", this.params.notificationId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			notification: Notifications.findOne({_id:this.params.notificationId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});