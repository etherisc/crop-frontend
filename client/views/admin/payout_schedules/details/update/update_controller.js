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
			Meteor.subscribe("i_policy1", this.params.iPolicyId)
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
			i_policy1: IPolicies.findOne({_id:this.params.iPolicyId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});