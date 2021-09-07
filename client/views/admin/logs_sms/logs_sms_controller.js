this.AdminLogsSmsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminLogsSms': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.loglineSmsListPagedExtraParams = {
			searchText: Session.get("LoglineSmsListPagedSearchString") || "",
			searchFields: Session.get("LoglineSmsListPagedSearchFields") || ["timestamp", "mobile_num", "message", "status", "status_message", "unique_id", "credits", "delivery_status_desc", "date_received", "amount", "total_cost", "prefix"],
			sortBy: Session.get("LoglineSmsListPagedSortBy") || "",
			sortAscending: Session.get("LoglineSmsListPagedSortAscending"),
			pageNo: Session.get("LoglineSmsListPagedPageNo") || 0,
			pageSize: Session.get("LoglineSmsListPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("logline_sms_list_paged", this.loglineSmsListPagedExtraParams),
			Meteor.subscribe("logline_sms_list_paged_count", this.loglineSmsListPagedExtraParams)
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
			logline_sms_list_paged: Sms.find(databaseUtils.extendFilter({}, this.loglineSmsListPagedExtraParams), databaseUtils.extendOptions({sort:{timestamp:-1}}, this.loglineSmsListPagedExtraParams)),
			logline_sms_list_paged_count: Counts.get("logline_sms_list_paged_count")
		};
		

		
		data.logline_sms_list_paged_page_count = this.loglineSmsListPagedExtraParams && this.loglineSmsListPagedExtraParams.pageSize ? Math.ceil(data.logline_sms_list_paged_count / this.loglineSmsListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.loglineSmsListPagedExtraParams.pageNo >= data.logline_sms_list_paged_page_count) {
			Session.set("LoglineSmsListPagedPageNo", data.logline_sms_list_paged_page_count > 0 ? data.logline_sms_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});