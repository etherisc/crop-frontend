this.LocationsController = RouteController.extend({
	template: "Locations",
	

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
		this.locationListPagedExtraParams = {
			searchText: Session.get("LocationListPagedSearchString") || "",
			searchFields: Session.get("LocationListPagedSearchFields") || ["prefix", "source", "county", "ward", "pixel", "latitude", "longitude", "site_table_exists"],
			sortBy: Session.get("LocationListPagedSortBy") || "",
			sortAscending: Session.get("LocationListPagedSortAscending"),
			pageNo: Session.get("LocationListPagedPageNo") || 0,
			pageSize: Session.get("LocationListPagedPageSize") || 25
		};



		

		var subs = [
			Meteor.subscribe("location_list_paged", this.locationListPagedExtraParams),
			Meteor.subscribe("location_list_paged_count", this.locationListPagedExtraParams)
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
			location_list_paged: Locations.find(databaseUtils.extendFilter({}, this.locationListPagedExtraParams), databaseUtils.extendOptions({}, this.locationListPagedExtraParams)),
			location_list_paged_count: Counts.get("location_list_paged_count")
		};
		

		
		data.location_list_paged_page_count = this.locationListPagedExtraParams && this.locationListPagedExtraParams.pageSize ? Math.ceil(data.location_list_paged_count / this.locationListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.locationListPagedExtraParams.pageNo >= data.location_list_paged_page_count) {
			Session.set("LocationListPagedPageNo", data.location_list_paged_page_count > 0 ? data.location_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});