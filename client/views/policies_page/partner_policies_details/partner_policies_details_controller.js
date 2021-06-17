this.PoliciesPagePartnerPoliciesDetailsController = RouteController.extend({
	template: "PoliciesPagePartnerPoliciesDetails",
	

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
		this.filteredPaymentsListPagedExtraParams = {
			searchText: Session.get("FilteredPaymentsListPagedSearchString") || "",
			searchFields: Session.get("FilteredPaymentsListPagedSearchFields") || ["mobile_num", "call_time", "mpesa_code", "mpesa_name", "order_number", "amount_paid"],
			sortBy: Session.get("FilteredPaymentsListPagedSortBy") || "",
			sortAscending: Session.get("FilteredPaymentsListPagedSortAscending"),
			pageNo: Session.get("FilteredPaymentsListPagedPageNo") || 0,
			pageSize: Session.get("FilteredPaymentsListPagedPageSize") || 0
		};
		this.filteredActivationsListPagedExtraParams = {
			searchText: Session.get("FilteredActivationsListPagedSearchString") || "",
			searchFields: Session.get("FilteredActivationsListPagedSearchFields") || ["prefix", "mobile_num", "call_time", "latitude", "longitude", "order_number", "activation_code", "value_chain", "amount_premium", "pixel", "county", "ward", "augmented", "amount_subsidy", "planting_date"],
			sortBy: Session.get("FilteredActivationsListPagedSortBy") || "",
			sortAscending: Session.get("FilteredActivationsListPagedSortAscending"),
			pageNo: Session.get("FilteredActivationsListPagedPageNo") || 0,
			pageSize: Session.get("FilteredActivationsListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("policy", this.params.policyId),
			Meteor.subscribe("filtered_payments_list_paged", this.params.mobile_num, this.filteredPaymentsListPagedExtraParams),
			Meteor.subscribe("filtered_payments_list_paged_count", this.params.mobile_num, this.filteredPaymentsListPagedExtraParams),
			Meteor.subscribe("filtered_activations_list_paged", this.params.mobile_num, this.filteredActivationsListPagedExtraParams),
			Meteor.subscribe("filtered_activations_list_paged_count", this.params.mobile_num, this.filteredActivationsListPagedExtraParams)
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
			policy: XPolicies.findOne({_id:this.params.policyId}, {}),
			filtered_payments_list_paged: Payments.find(databaseUtils.extendFilter({mobile_num:this.params.mobile_num}, this.filteredPaymentsListPagedExtraParams), databaseUtils.extendOptions({}, this.filteredPaymentsListPagedExtraParams)),
			filtered_payments_list_paged_count: Counts.get("filtered_payments_list_paged_count"),
			filtered_activations_list_paged: Activations.find(databaseUtils.extendFilter({mobile_num:this.params.mobile_num}, this.filteredActivationsListPagedExtraParams), databaseUtils.extendOptions({}, this.filteredActivationsListPagedExtraParams)),
			filtered_activations_list_paged_count: Counts.get("filtered_activations_list_paged_count")
		};
		

		
		data.filtered_activations_list_paged_page_count = this.filteredActivationsListPagedExtraParams && this.filteredActivationsListPagedExtraParams.pageSize ? Math.ceil(data.filtered_activations_list_paged_count / this.filteredActivationsListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.filteredActivationsListPagedExtraParams.pageNo >= data.filtered_activations_list_paged_page_count) {
			Session.set("FilteredActivationsListPagedPageNo", data.filtered_activations_list_paged_page_count > 0 ? data.filtered_activations_list_paged_page_count - 1 : 0);
		}

		data.filtered_payments_list_paged_page_count = this.filteredPaymentsListPagedExtraParams && this.filteredPaymentsListPagedExtraParams.pageSize ? Math.ceil(data.filtered_payments_list_paged_count / this.filteredPaymentsListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.filteredPaymentsListPagedExtraParams.pageNo >= data.filtered_payments_list_paged_page_count) {
			Session.set("FilteredPaymentsListPagedPageNo", data.filtered_payments_list_paged_page_count > 0 ? data.filtered_payments_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});