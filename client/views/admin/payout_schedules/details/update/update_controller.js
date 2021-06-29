this.AdminPayoutSchedulesDetailsUpdateController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminPayoutSchedulesDetailsUpdate': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("policy", this.params.policyId)
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
			policy: Policies.findOne({_id:this.params.policyId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});