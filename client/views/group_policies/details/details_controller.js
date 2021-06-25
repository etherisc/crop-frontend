this.GroupPoliciesDetailsController = RouteController.extend({
	template: "GroupPoliciesDetails",


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
		this.gpIndividualPoliciesPagedExtraParams = {
			searchText: Session.get("GpIndividualPoliciesPagedSearchString") || "",
			searchFields: Session.get("GpIndividualPoliciesPagedSearchFields") || ["id", "group_policy_id", "phone_no", "premium_amount", "sum_insured_amount", "activation", "payments", "payout", "meta", "payout.total_amount", "payout.deductible_amount", "payout.actual_amount"],
			sortBy: Session.get("GpIndividualPoliciesPagedSortBy") || "",
			sortAscending: Session.get("GpIndividualPoliciesPagedSortAscending"),
			pageNo: Session.get("GpIndividualPoliciesPagedPageNo") || 0,
			pageSize: Session.get("GpIndividualPoliciesPagedPageSize") || 20
		};



		var gp_id = this.params.groupPolicyId;

		var subs = [
			Meteor.subscribe("group_policy", this.params.groupPolicyId),
			Meteor.subscribe("gp_individual_policies_paged", gp_id, this.gpIndividualPoliciesPagedExtraParams),
			Meteor.subscribe("gp_individual_policies_paged_count", gp_id, this.gpIndividualPoliciesPagedExtraParams)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		var gp_id = this.params.groupPolicyId;

		var data = {
			params: this.params || {},
			group_policy: GroupPolicies.findOne({_id:this.params.groupPolicyId}, {}),
			gp_individual_policies_paged: Policies.find(databaseUtils.extendFilter({gp_id:gp_id}, this.gpIndividualPoliciesPagedExtraParams), databaseUtils.extendOptions({}, this.gpIndividualPoliciesPagedExtraParams)),
			gp_individual_policies_paged_count: Counts.get("gp_individual_policies_paged_count")
		};



		data.gp_individual_policies_paged_page_count = this.gpIndividualPoliciesPagedExtraParams && this.gpIndividualPoliciesPagedExtraParams.pageSize ? Math.ceil(data.gp_individual_policies_paged_count / this.gpIndividualPoliciesPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.gpIndividualPoliciesPagedExtraParams.pageNo >= data.gp_individual_policies_paged_page_count) {
			Session.set("GpIndividualPoliciesPagedPageNo", data.gp_individual_policies_paged_page_count > 0 ? data.gp_individual_policies_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {

	}
});
