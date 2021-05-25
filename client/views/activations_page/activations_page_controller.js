this.ActivationsPageController = RouteController.extend({
	template: "ActivationsPage",
	

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
		this.activationListPagedExtraParams = {
			searchText: Session.get("ActivationListPagedSearchString") || "",
			searchFields: Session.get("ActivationListPagedSearchFields") || ["mobile_num", "call_time", "latitude", "longitude", "order_number", "activation_code", "value_chain", "amount_premium", "pixel"],
			sortBy: Session.get("ActivationListPagedSortBy") || "",
			sortAscending: Session.get("ActivationListPagedSortAscending"),
			pageNo: Session.get("ActivationListPagedPageNo") || 0,
			pageSize: Session.get("ActivationListPagedPageSize") || 25
		};



		

		var subs = [
			Meteor.subscribe("activation_list_paged", this.activationListPagedExtraParams),
			Meteor.subscribe("activation_list_paged_count", this.activationListPagedExtraParams)
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
			activation_list_paged: Activations.find(databaseUtils.extendFilter({}, this.activationListPagedExtraParams), databaseUtils.extendOptions({}, this.activationListPagedExtraParams)),
			activation_list_paged_count: Counts.get("activation_list_paged_count")
		};
		

		
		data.activation_list_paged_page_count = this.activationListPagedExtraParams && this.activationListPagedExtraParams.pageSize ? Math.ceil(data.activation_list_paged_count / this.activationListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.activationListPagedExtraParams.pageNo >= data.activation_list_paged_page_count) {
			Session.set("ActivationListPagedPageNo", data.activation_list_paged_page_count > 0 ? data.activation_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});