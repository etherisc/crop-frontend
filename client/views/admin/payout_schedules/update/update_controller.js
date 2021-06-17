this.AdminPayoutSchedulesUpdateController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminPayoutSchedulesUpdate': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("payout_schedule", this.params.payoutScheduleId)
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
			payout_schedule: PayoutSchedules.findOne({_id:this.params.payoutScheduleId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});