this.AdminLogsBusinessTaskController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminLogsBusinessTask': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.btxLineListPagedExtraParams = {
			searchText: Session.get("BtxLineListPagedSearchString") || "",
			searchFields: Session.get("BtxLineListPagedSearchFields") || ["timestamp", "process_name", "business_tx_id", "business_tx_status", "task_name", "task_id", "task_status", "message"],
			sortBy: Session.get("BtxLineListPagedSortBy") || "",
			sortAscending: Session.get("BtxLineListPagedSortAscending"),
			pageNo: Session.get("BtxLineListPagedPageNo") || 0,
			pageSize: Session.get("BtxLineListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("btx_line_list_paged", this.btxLineListPagedExtraParams),
			Meteor.subscribe("btx_line_list_paged_count", this.btxLineListPagedExtraParams)
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
			btx_line_list_paged: BusinessTransactionLog.find(databaseUtils.extendFilter({}, this.btxLineListPagedExtraParams), databaseUtils.extendOptions({sort:{timestamp:-1}}, this.btxLineListPagedExtraParams)),
			btx_line_list_paged_count: Counts.get("btx_line_list_paged_count")
		};
		

		
		data.btx_line_list_paged_page_count = this.btxLineListPagedExtraParams && this.btxLineListPagedExtraParams.pageSize ? Math.ceil(data.btx_line_list_paged_count / this.btxLineListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.btxLineListPagedExtraParams.pageNo >= data.btx_line_list_paged_page_count) {
			Session.set("BtxLineListPagedPageNo", data.btx_line_list_paged_page_count > 0 ? data.btx_line_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});