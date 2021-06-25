this.GroupPoliciesController = RouteController.extend({
	template: "GroupPolicies",
	

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
		this.groupPolicyListPagedExtraParams = {
			searchText: Session.get("GroupPolicyListPagedSearchString") || "",
			searchFields: Session.get("GroupPolicyListPagedSearchFields") || ["id", "location.pixel", "sow_window", "sow_date", "begin_date", "end_date", "crop_stages", "payout", "meta"],
			sortBy: Session.get("GroupPolicyListPagedSortBy") || "",
			sortAscending: Session.get("GroupPolicyListPagedSortAscending"),
			pageNo: Session.get("GroupPolicyListPagedPageNo") || 0,
			pageSize: Session.get("GroupPolicyListPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("group_policy_list_paged", this.groupPolicyListPagedExtraParams),
			Meteor.subscribe("group_policy_list_paged_count", this.groupPolicyListPagedExtraParams)
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
			group_policy_list_paged: GroupPolicies.find(databaseUtils.extendFilter({}, this.groupPolicyListPagedExtraParams), databaseUtils.extendOptions({sort:{location:1}}, this.groupPolicyListPagedExtraParams)),
			group_policy_list_paged_count: Counts.get("group_policy_list_paged_count")
		};
		

		
		data.group_policy_list_paged_page_count = this.groupPolicyListPagedExtraParams && this.groupPolicyListPagedExtraParams.pageSize ? Math.ceil(data.group_policy_list_paged_count / this.groupPolicyListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.groupPolicyListPagedExtraParams.pageNo >= data.group_policy_list_paged_page_count) {
			Session.set("GroupPolicyListPagedPageNo", data.group_policy_list_paged_page_count > 0 ? data.group_policy_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});