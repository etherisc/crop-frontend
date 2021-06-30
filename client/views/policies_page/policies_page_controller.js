this.PoliciesPageController = RouteController.extend({
	template: "PoliciesPage",
	

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
		this.policyList1PagedExtraParams = {
			searchText: Session.get("PolicyList1PagedSearchString") || "",
			searchFields: Session.get("PolicyList1PagedSearchFields") || ["id", "gp_id", "group_policy_id", "phone_no", "premium_amount", "sum_insured_amount", "activation", "payments", "payout", "meta"],
			sortBy: Session.get("PolicyList1PagedSortBy") || "",
			sortAscending: Session.get("PolicyList1PagedSortAscending"),
			pageNo: Session.get("PolicyList1PagedPageNo") || 0,
			pageSize: Session.get("PolicyList1PagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("policy_list1_paged", this.policyList1PagedExtraParams),
			Meteor.subscribe("policy_list1_paged_count", this.policyList1PagedExtraParams)
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
			policy_list1_paged: Policies.find(databaseUtils.extendFilter({}, this.policyList1PagedExtraParams), databaseUtils.extendOptions({}, this.policyList1PagedExtraParams)),
			policy_list1_paged_count: Counts.get("policy_list1_paged_count")
		};
		

		
		data.policy_list1_paged_page_count = this.policyList1PagedExtraParams && this.policyList1PagedExtraParams.pageSize ? Math.ceil(data.policy_list1_paged_count / this.policyList1PagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.policyList1PagedExtraParams.pageNo >= data.policy_list1_paged_page_count) {
			Session.set("PolicyList1PagedPageNo", data.policy_list1_paged_page_count > 0 ? data.policy_list1_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});