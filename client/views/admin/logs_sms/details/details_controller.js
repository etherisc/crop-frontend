this.AdminLogsSmsDetailsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminLogsSmsDetails': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("logline_sms", this.params.loglineSmsId)
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
			logline_sms: Sms.findOne({_id:this.params.loglineSmsId}, {sort:{timestamp:-1}})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});