this.PartnersDetailsController = RouteController.extend({
	template: "PartnersDetails",
	

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
		this.partnerPoliciesListPagedExtraParams = {
			searchText: Session.get("PartnerPoliciesListPagedSearchString") || "",
			searchFields: Session.get("PartnerPoliciesListPagedSearchFields") || ["id", "siteTable_id", "policyStatus_code", "startDate", "endDate", "order_number", "mobile_num", "is_signed"],
			sortBy: Session.get("PartnerPoliciesListPagedSortBy") || "",
			sortAscending: Session.get("PartnerPoliciesListPagedSortAscending"),
			pageNo: Session.get("PartnerPoliciesListPagedPageNo") || 0,
			pageSize: Session.get("PartnerPoliciesListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("partner", this.params.partnerId),
			Meteor.subscribe("partner_policies_list_paged", this.params.mobile_num, this.partnerPoliciesListPagedExtraParams),
			Meteor.subscribe("partner_policies_list_paged_count", this.params.mobile_num, this.partnerPoliciesListPagedExtraParams)
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
			partner: Partners.findOne({_id:this.params.partnerId}, {}),
			partner_policies_list_paged: Policies.find(databaseUtils.extendFilter({mobile_num:this.params.mobile_num}, this.partnerPoliciesListPagedExtraParams), databaseUtils.extendOptions({}, this.partnerPoliciesListPagedExtraParams)),
			partner_policies_list_paged_count: Counts.get("partner_policies_list_paged_count")
		};
		

		
		data.partner_policies_list_paged_page_count = this.partnerPoliciesListPagedExtraParams && this.partnerPoliciesListPagedExtraParams.pageSize ? Math.ceil(data.partner_policies_list_paged_count / this.partnerPoliciesListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.partnerPoliciesListPagedExtraParams.pageNo >= data.partner_policies_list_paged_page_count) {
			Session.set("PartnerPoliciesListPagedPageNo", data.partner_policies_list_paged_page_count > 0 ? data.partner_policies_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});