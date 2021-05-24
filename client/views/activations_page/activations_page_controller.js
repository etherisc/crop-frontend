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
		this.emptyPagedExtraParams = {
			searchText: Session.get("EmptyPagedSearchString") || "",
			searchFields: Session.get("EmptyPagedSearchFields") || ["new_field", "new_field1"],
			sortBy: Session.get("EmptyPagedSortBy") || "",
			sortAscending: Session.get("EmptyPagedSortAscending"),
			pageNo: Session.get("EmptyPagedPageNo") || 0,
			pageSize: Session.get("EmptyPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("activation_list_paged", this.activationListPagedExtraParams),
			Meteor.subscribe("activation_list_paged_count", this.activationListPagedExtraParams),
			Meteor.subscribe("empty_paged", this.emptyPagedExtraParams),
			Meteor.subscribe("empty_paged_count", this.emptyPagedExtraParams)
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
			activation_list_paged_count: Counts.get("activation_list_paged_count"),
			empty_paged: Empty.find(databaseUtils.extendFilter({}, this.emptyPagedExtraParams), databaseUtils.extendOptions({}, this.emptyPagedExtraParams)),
			empty_paged_count: Counts.get("empty_paged_count")
		};
		

		
		data.empty_paged_page_count = this.emptyPagedExtraParams && this.emptyPagedExtraParams.pageSize ? Math.ceil(data.empty_paged_count / this.emptyPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.emptyPagedExtraParams.pageNo >= data.empty_paged_page_count) {
			Session.set("EmptyPagedPageNo", data.empty_paged_page_count > 0 ? data.empty_paged_page_count - 1 : 0);
		}

		data.activation_list_paged_page_count = this.activationListPagedExtraParams && this.activationListPagedExtraParams.pageSize ? Math.ceil(data.activation_list_paged_count / this.activationListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.activationListPagedExtraParams.pageNo >= data.activation_list_paged_page_count) {
			Session.set("ActivationListPagedPageNo", data.activation_list_paged_page_count > 0 ? data.activation_list_paged_page_count - 1 : 0);
		}
/* Custom Data Code  Test */
   


		return data;
	},

	onAfterAction: function() {
		
	}
});