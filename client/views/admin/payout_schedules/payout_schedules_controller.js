this.AdminPayoutSchedulesController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminPayoutSchedules': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.payoutScheduleListPagedExtraParams = {
			searchText: Session.get("PayoutScheduleListPagedSearchString") || "",
			searchFields: Session.get("PayoutScheduleListPagedSearchFields") || ["title", "filter", "status", "num_policies", "sum_premium", "sum_insured", "sum_payout", "createdAt", "modifiedAt", "audit_trail"],
			sortBy: Session.get("PayoutScheduleListPagedSortBy") || "",
			sortAscending: Session.get("PayoutScheduleListPagedSortAscending"),
			pageNo: Session.get("PayoutScheduleListPagedPageNo") || 0,
			pageSize: Session.get("PayoutScheduleListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("payout_schedule_list_paged", this.payoutScheduleListPagedExtraParams),
			Meteor.subscribe("payout_schedule_list_paged_count", this.payoutScheduleListPagedExtraParams)
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
			payout_schedule_list_paged: PayoutSchedules.find(databaseUtils.extendFilter({}, this.payoutScheduleListPagedExtraParams), databaseUtils.extendOptions({}, this.payoutScheduleListPagedExtraParams)),
			payout_schedule_list_paged_count: Counts.get("payout_schedule_list_paged_count")
		};
		

		
		data.payout_schedule_list_paged_page_count = this.payoutScheduleListPagedExtraParams && this.payoutScheduleListPagedExtraParams.pageSize ? Math.ceil(data.payout_schedule_list_paged_count / this.payoutScheduleListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.payoutScheduleListPagedExtraParams.pageNo >= data.payout_schedule_list_paged_page_count) {
			Session.set("PayoutScheduleListPagedPageNo", data.payout_schedule_list_paged_page_count > 0 ? data.payout_schedule_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});