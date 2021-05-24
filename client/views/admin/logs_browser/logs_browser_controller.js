this.AdminLogsBrowserController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminLogsBrowser': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.loglinePagedExtraParams = {
			searchText: Session.get("LoglinePagedSearchString") || "",
			searchFields: Session.get("LoglinePagedSearchFields") || ["timestamp", "type", "source", "message", "args"],
			sortBy: Session.get("LoglinePagedSortBy") || "",
			sortAscending: Session.get("LoglinePagedSortAscending"),
			pageNo: Session.get("LoglinePagedPageNo") || 0,
			pageSize: Session.get("LoglinePagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("logline_paged", this.loglinePagedExtraParams),
			Meteor.subscribe("logline_paged_count", this.loglinePagedExtraParams)
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
			logline_paged: Logs.find(databaseUtils.extendFilter({}, this.loglinePagedExtraParams), databaseUtils.extendOptions({}, this.loglinePagedExtraParams)),
			logline_paged_count: Counts.get("logline_paged_count")
		};
		

		
		data.logline_paged_page_count = this.loglinePagedExtraParams && this.loglinePagedExtraParams.pageSize ? Math.ceil(data.logline_paged_count / this.loglinePagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.loglinePagedExtraParams.pageNo >= data.logline_paged_page_count) {
			Session.set("LoglinePagedPageNo", data.logline_paged_page_count > 0 ? data.logline_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});