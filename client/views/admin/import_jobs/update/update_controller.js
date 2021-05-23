this.AdminImportJobsUpdateController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminImportJobsUpdate': { to: 'AdminSubcontent'}
		
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
			Meteor.subscribe("import_job", this.params.importJobId)
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
			import_job: ImportJobs.findOne({_id:this.params.importJobId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});