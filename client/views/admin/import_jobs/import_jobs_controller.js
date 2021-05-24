this.AdminImportJobsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminImportJobs': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.importJobListPagedExtraParams = {
			searchText: Session.get("ImportJobListPagedSearchString") || "",
			searchFields: Session.get("ImportJobListPagedSearchFields") || ["bucket", "filename", "action", "prefix", "status", "message", "last_run"],
			sortBy: Session.get("ImportJobListPagedSortBy") || "",
			sortAscending: Session.get("ImportJobListPagedSortAscending"),
			pageNo: Session.get("ImportJobListPagedPageNo") || 0,
			pageSize: Session.get("ImportJobListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("import_job_list_paged", this.importJobListPagedExtraParams),
			Meteor.subscribe("import_job_list_paged_count", this.importJobListPagedExtraParams)
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
			import_job_list_paged: ImportJobs.find(databaseUtils.extendFilter({}, this.importJobListPagedExtraParams), databaseUtils.extendOptions({}, this.importJobListPagedExtraParams)),
			import_job_list_paged_count: Counts.get("import_job_list_paged_count")
		};
		

		
		data.import_job_list_paged_page_count = this.importJobListPagedExtraParams && this.importJobListPagedExtraParams.pageSize ? Math.ceil(data.import_job_list_paged_count / this.importJobListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.importJobListPagedExtraParams.pageNo >= data.import_job_list_paged_page_count) {
			Session.set("ImportJobListPagedPageNo", data.import_job_list_paged_page_count > 0 ? data.import_job_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});