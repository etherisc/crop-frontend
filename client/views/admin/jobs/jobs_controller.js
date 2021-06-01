this.AdminJobsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminJobs': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.jobListPagedExtraParams = {
			searchText: Session.get("JobListPagedSearchString") || "",
			searchFields: Session.get("JobListPagedSearchFields") || ["action", "parameters", "status", "message", "last_run"],
			sortBy: Session.get("JobListPagedSortBy") || "",
			sortAscending: Session.get("JobListPagedSortAscending"),
			pageNo: Session.get("JobListPagedPageNo") || 0,
			pageSize: Session.get("JobListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("job_list_paged", this.jobListPagedExtraParams),
			Meteor.subscribe("job_list_paged_count", this.jobListPagedExtraParams)
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
			job_list_paged: Jobs.find(databaseUtils.extendFilter({}, this.jobListPagedExtraParams), databaseUtils.extendOptions({}, this.jobListPagedExtraParams)),
			job_list_paged_count: Counts.get("job_list_paged_count")
		};
		

		
		data.job_list_paged_page_count = this.jobListPagedExtraParams && this.jobListPagedExtraParams.pageSize ? Math.ceil(data.job_list_paged_count / this.jobListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.jobListPagedExtraParams.pageNo >= data.job_list_paged_page_count) {
			Session.set("JobListPagedPageNo", data.job_list_paged_page_count > 0 ? data.job_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});