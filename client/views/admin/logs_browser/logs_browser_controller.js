this.AdminLogsBrowserController = RouteController.extend({
	template: "AdminLogsBrowser",
	

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
		this.loglinesBrowserPagedExtraParams = {
			searchText: Session.get("LoglinesBrowserPagedSearchString") || "",
			searchFields: Session.get("LoglinesBrowserPagedSearchFields") || ["timestamp", "type", "source", "message", "args"],
			sortBy: Session.get("LoglinesBrowserPagedSortBy") || "",
			sortAscending: Session.get("LoglinesBrowserPagedSortAscending"),
			pageNo: Session.get("LoglinesBrowserPagedPageNo") || 0,
			pageSize: Session.get("LoglinesBrowserPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("loglines_browser_paged", this.loglinesBrowserPagedExtraParams),
			Meteor.subscribe("loglines_browser_paged_count", this.loglinesBrowserPagedExtraParams)
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
			loglines_browser_paged: Logs.find(databaseUtils.extendFilter({source:"browser"}, this.loglinesBrowserPagedExtraParams), databaseUtils.extendOptions({}, this.loglinesBrowserPagedExtraParams)),
			loglines_browser_paged_count: Counts.get("loglines_browser_paged_count")
		};
		

		
		data.loglines_browser_paged_page_count = this.loglinesBrowserPagedExtraParams && this.loglinesBrowserPagedExtraParams.pageSize ? Math.ceil(data.loglines_browser_paged_count / this.loglinesBrowserPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.loglinesBrowserPagedExtraParams.pageNo >= data.loglines_browser_paged_page_count) {
			Session.set("LoglinesBrowserPagedPageNo", data.loglines_browser_paged_page_count > 0 ? data.loglines_browser_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});