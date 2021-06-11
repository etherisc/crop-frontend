this.AdminLogsSmsDetailsController = RouteController.extend({
	template: "AdminLogsSmsDetails",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
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
			logline_sms: Sms.findOne({_id:this.params.loglineSmsId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});