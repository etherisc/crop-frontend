this.AdminDirectPayoutsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminDirectPayouts': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.directPayoutListPagedExtraParams = {
			searchText: Session.get("DirectPayoutListPagedSearchString") || "",
			searchFields: Session.get("DirectPayoutListPagedSearchFields") || ["mobile_num", "amount", "status", "prefix", "msg"],
			sortBy: Session.get("DirectPayoutListPagedSortBy") || "",
			sortAscending: Session.get("DirectPayoutListPagedSortAscending"),
			pageNo: Session.get("DirectPayoutListPagedPageNo") || 0,
			pageSize: Session.get("DirectPayoutListPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("direct_payout_list_paged", this.directPayoutListPagedExtraParams),
			Meteor.subscribe("direct_payout_list_paged_count", this.directPayoutListPagedExtraParams)
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
			direct_payout_list_paged: DirectPayouts.find(databaseUtils.extendFilter({}, this.directPayoutListPagedExtraParams), databaseUtils.extendOptions({}, this.directPayoutListPagedExtraParams)),
			direct_payout_list_paged_count: Counts.get("direct_payout_list_paged_count")
		};
		

		
		data.direct_payout_list_paged_page_count = this.directPayoutListPagedExtraParams && this.directPayoutListPagedExtraParams.pageSize ? Math.ceil(data.direct_payout_list_paged_count / this.directPayoutListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.directPayoutListPagedExtraParams.pageNo >= data.direct_payout_list_paged_page_count) {
			Session.set("DirectPayoutListPagedPageNo", data.direct_payout_list_paged_page_count > 0 ? data.direct_payout_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});