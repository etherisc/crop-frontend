this.FispFarmersController = RouteController.extend({
	template: "FispFarmers",
	

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
		this.fispFarmerListPagedExtraParams = {
			searchText: Session.get("FispFarmerListPagedSearchString") || "",
			searchFields: Session.get("FispFarmerListPagedSearchFields") || ["name", "camp", "mobile_num", "national_registration_number", "fisp_member", "verified"],
			sortBy: Session.get("FispFarmerListPagedSortBy") || "",
			sortAscending: Session.get("FispFarmerListPagedSortAscending"),
			pageNo: Session.get("FispFarmerListPagedPageNo") || 0,
			pageSize: Session.get("FispFarmerListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("fisp_farmer_list_paged", this.fispFarmerListPagedExtraParams),
			Meteor.subscribe("fisp_farmer_list_paged_count", this.fispFarmerListPagedExtraParams)
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
			fisp_farmer_list_paged: FispFarmers.find(databaseUtils.extendFilter({}, this.fispFarmerListPagedExtraParams), databaseUtils.extendOptions({}, this.fispFarmerListPagedExtraParams)),
			fisp_farmer_list_paged_count: Counts.get("fisp_farmer_list_paged_count")
		};
		

		
		data.fisp_farmer_list_paged_page_count = this.fispFarmerListPagedExtraParams && this.fispFarmerListPagedExtraParams.pageSize ? Math.ceil(data.fisp_farmer_list_paged_count / this.fispFarmerListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.fispFarmerListPagedExtraParams.pageNo >= data.fisp_farmer_list_paged_page_count) {
			Session.set("FispFarmerListPagedPageNo", data.fisp_farmer_list_paged_page_count > 0 ? data.fisp_farmer_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});