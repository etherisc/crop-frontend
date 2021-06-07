this.AdminLogsServerController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminLogsServer': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.loglinesServerPagedExtraParams = {
			searchText: Session.get("LoglinesServerPagedSearchString") || "",
			searchFields: Session.get("LoglinesServerPagedSearchFields") || ["timestamp", "type", "source", "message", "args"],
			sortBy: Session.get("LoglinesServerPagedSortBy") || "",
			sortAscending: Session.get("LoglinesServerPagedSortAscending"),
			pageNo: Session.get("LoglinesServerPagedPageNo") || 0,
			pageSize: Session.get("LoglinesServerPagedPageSize") || 25
		};



		

		var subs = [
			Meteor.subscribe("loglines_server_paged", this.loglinesServerPagedExtraParams),
			Meteor.subscribe("loglines_server_paged_count", this.loglinesServerPagedExtraParams)
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
			loglines_server_paged: Logs.find(databaseUtils.extendFilter({source:"server"}, this.loglinesServerPagedExtraParams), databaseUtils.extendOptions({sort:{timestamp:-1}}, this.loglinesServerPagedExtraParams)),
			loglines_server_paged_count: Counts.get("loglines_server_paged_count")
		};
		

		
		data.loglines_server_paged_page_count = this.loglinesServerPagedExtraParams && this.loglinesServerPagedExtraParams.pageSize ? Math.ceil(data.loglines_server_paged_count / this.loglinesServerPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.loglinesServerPagedExtraParams.pageNo >= data.loglines_server_paged_page_count) {
			Session.set("LoglinesServerPagedPageNo", data.loglines_server_paged_page_count > 0 ? data.loglines_server_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});