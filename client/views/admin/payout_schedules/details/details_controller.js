this.AdminPayoutSchedulesDetailsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminPayoutSchedulesDetails': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.payoutScheduleEntriesListPagedExtraParams = {
			searchText: Session.get("PayoutScheduleEntriesListPagedSearchString") || "",
			searchFields: Session.get("PayoutScheduleEntriesListPagedSearchFields") || ["phone_no", "crop", "premium", "sum_insured", "payout_amount"],
			sortBy: Session.get("PayoutScheduleEntriesListPagedSortBy") || "",
			sortAscending: Session.get("PayoutScheduleEntriesListPagedSortAscending"),
			pageNo: Session.get("PayoutScheduleEntriesListPagedPageNo") || 0,
			pageSize: Session.get("PayoutScheduleEntriesListPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("payout_schedule", this.params.payoutScheduleId),
			Meteor.subscribe("payout_schedule_entries_list_paged", this.params.payoutScheduleId, this.payoutScheduleEntriesListPagedExtraParams),
			Meteor.subscribe("payout_schedule_entries_list_paged_count", this.params.payoutScheduleId, this.payoutScheduleEntriesListPagedExtraParams)
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
			payout_schedule: PayoutSchedules.findOne({_id:this.params.payoutScheduleId}, {}),
			payout_schedule_entries_list_paged: Policies.find(databaseUtils.extendFilter({payout_schedule_id:this.params.payoutScheduleId}, this.payoutScheduleEntriesListPagedExtraParams), databaseUtils.extendOptions({}, this.payoutScheduleEntriesListPagedExtraParams)),
			payout_schedule_entries_list_paged_count: Counts.get("payout_schedule_entries_list_paged_count")
		};
		

		
		data.payout_schedule_entries_list_paged_page_count = this.payoutScheduleEntriesListPagedExtraParams && this.payoutScheduleEntriesListPagedExtraParams.pageSize ? Math.ceil(data.payout_schedule_entries_list_paged_count / this.payoutScheduleEntriesListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.payoutScheduleEntriesListPagedExtraParams.pageNo >= data.payout_schedule_entries_list_paged_page_count) {
			Session.set("PayoutScheduleEntriesListPagedPageNo", data.payout_schedule_entries_list_paged_page_count > 0 ? data.payout_schedule_entries_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});