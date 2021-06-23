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
		this.gpCropStagesListPagedExtraParams = {
			searchText: Session.get("GpCropStagesListPagedSearchString") || "",
			searchFields: Session.get("GpCropStagesListPagedSearchFields") || ["cs_id", "gp_mongo_id", "weight", "date_begin", "date_end", "trigger", "blocks_total", "blocks_loss", "payout"],
			sortBy: Session.get("GpCropStagesListPagedSortBy") || "",
			sortAscending: Session.get("GpCropStagesListPagedSortAscending"),
			pageNo: Session.get("GpCropStagesListPagedPageNo") || 0,
			pageSize: Session.get("GpCropStagesListPagedPageSize") || 0
		};
		this.gpIndividualPoliciesPagedExtraParams = {
			searchText: Session.get("GpIndividualPoliciesPagedSearchString") || "",
			searchFields: Session.get("GpIndividualPoliciesPagedSearchFields") || ["voucher_no", "phone_no", "crop", "activation_window", "location", "date_begin", "date_end", "activation_timestamp", "group_policy_id", "gp_mongo_id", "premium", "sum_insured", "paym_mpesa_no", "paym_timestamp", "paym_amount", "payout_timestamp", "payout_amount_total", "payout_amount_deductible", "payout_amount", "payout_schedule_id", "payout_override_comment"],
			sortBy: Session.get("GpIndividualPoliciesPagedSortBy") || "",
			sortAscending: Session.get("GpIndividualPoliciesPagedSortAscending"),
			pageNo: Session.get("GpIndividualPoliciesPagedPageNo") || 0,
			pageSize: Session.get("GpIndividualPoliciesPagedPageSize") || 0
		};





		var subs = [
			Meteor.subscribe("group_policy", this.params.groupPolicyId),
			Meteor.subscribe("gp_crop_stages_list_paged", this.params.groupPolicyId, this.gpCropStagesListPagedExtraParams),
			Meteor.subscribe("gp_crop_stages_list_paged_count", this.params.groupPolicyId, this.gpCropStagesListPagedExtraParams),
			Meteor.subscribe("gp_individual_policies_paged", this.params.groupPolicyId, this.gpIndividualPoliciesPagedExtraParams),
			Meteor.subscribe("gp_individual_policies_paged_count", this.params.groupPolicyId, this.gpIndividualPoliciesPagedExtraParams)
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
			group_policy: GroupPolicies.findOne({_id:this.params.groupPolicyId}, {}),
			gp_crop_stages_list_paged: CropStages.find(databaseUtils.extendFilter({gp_mongo_id:this.params.groupPolicyId}, this.gpCropStagesListPagedExtraParams), databaseUtils.extendOptions({}, this.gpCropStagesListPagedExtraParams)),
			gp_crop_stages_list_paged_count: Counts.get("gp_crop_stages_list_paged_count"),
			gp_individual_policies_paged: IPolicies.find(databaseUtils.extendFilter({gp_mongo_id:this.params.groupPolicyId}, this.gpIndividualPoliciesPagedExtraParams), databaseUtils.extendOptions({}, this.gpIndividualPoliciesPagedExtraParams)),
			gp_individual_policies_paged_count: Counts.get("gp_individual_policies_paged_count")
		};



		data.gp_individual_policies_paged_page_count = this.gpIndividualPoliciesPagedExtraParams && this.gpIndividualPoliciesPagedExtraParams.pageSize ? Math.ceil(data.gp_individual_policies_paged_count / this.gpIndividualPoliciesPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.gpIndividualPoliciesPagedExtraParams.pageNo >= data.gp_individual_policies_paged_page_count) {
			Session.set("GpIndividualPoliciesPagedPageNo", data.gp_individual_policies_paged_page_count > 0 ? data.gp_individual_policies_paged_page_count - 1 : 0);
		}

		data.gp_crop_stages_list_paged_page_count = this.gpCropStagesListPagedExtraParams && this.gpCropStagesListPagedExtraParams.pageSize ? Math.ceil(data.gp_crop_stages_list_paged_count / this.gpCropStagesListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.gpCropStagesListPagedExtraParams.pageNo >= data.gp_crop_stages_list_paged_page_count) {
			Session.set("GpCropStagesListPagedPageNo", data.gp_crop_stages_list_paged_page_count > 0 ? data.gp_crop_stages_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {

	}
});
