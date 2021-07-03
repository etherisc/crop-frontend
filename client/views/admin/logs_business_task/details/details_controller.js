this.AdminLogsBusinessTaskDetailsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminLogsBusinessTaskDetails': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("btx_line", this.params.btxLineId)
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
			btx_line: BusinessTransactionLog.findOne({_id:this.params.btxLineId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});