this.AdminJobsDetailsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminJobsDetails': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("job", this.params.jobId)
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
			job: Jobs.findOne({_id:this.params.jobId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});