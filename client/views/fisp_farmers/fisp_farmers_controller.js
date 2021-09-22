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
		this.fispFarmerList1PagedExtraParams = {
			searchText: Session.get("FispFarmerList1PagedSearchString") || "",
			searchFields: Session.get("FispFarmerList1PagedSearchFields") || ["name", "camp", "mobile_num", "national_registration_number", "fisp_member", "verified"],
			sortBy: Session.get("FispFarmerList1PagedSortBy") || "",
			sortAscending: Session.get("FispFarmerList1PagedSortAscending"),
			pageNo: Session.get("FispFarmerList1PagedPageNo") || 0,
			pageSize: Session.get("FispFarmerList1PagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("fisp_farmer_list1_paged", this.fispFarmerList1PagedExtraParams),
			Meteor.subscribe("fisp_farmer_list1_paged_count", this.fispFarmerList1PagedExtraParams)
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
			fisp_farmer_list1_paged: FispFarmers.find(databaseUtils.extendFilter({}, this.fispFarmerList1PagedExtraParams), databaseUtils.extendOptions({}, this.fispFarmerList1PagedExtraParams)),
			fisp_farmer_list1_paged_count: Counts.get("fisp_farmer_list1_paged_count")
		};
		

		
		data.fisp_farmer_list1_paged_page_count = this.fispFarmerList1PagedExtraParams && this.fispFarmerList1PagedExtraParams.pageSize ? Math.ceil(data.fisp_farmer_list1_paged_count / this.fispFarmerList1PagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.fispFarmerList1PagedExtraParams.pageNo >= data.fisp_farmer_list1_paged_page_count) {
			Session.set("FispFarmerList1PagedPageNo", data.fisp_farmer_list1_paged_page_count > 0 ? data.fisp_farmer_list1_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});