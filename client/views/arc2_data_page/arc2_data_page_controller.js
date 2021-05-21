this.Arc2DataPageController = RouteController.extend({
	template: "Arc2DataPage",
	

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
		this.arc2rowListPagedExtraParams = {
			searchText: Session.get("Arc2rowListPagedSearchString") || "",
			searchFields: Session.get("Arc2rowListPagedSearchFields") || ["pixel", "pixel_date", "Y1983", "_dummy", "Y2010", "Y2011", "Y2012", "Y2013", "Y2014", "Y2015", "Y2016", "Y2017", "Y2018", "Y2019"],
			sortBy: Session.get("Arc2rowListPagedSortBy") || "",
			sortAscending: Session.get("Arc2rowListPagedSortAscending"),
			pageNo: Session.get("Arc2rowListPagedPageNo") || 0,
			pageSize: Session.get("Arc2rowListPagedPageSize") || 25
		};



		

		var subs = [
			Meteor.subscribe("arc2row_list_paged", this.arc2rowListPagedExtraParams),
			Meteor.subscribe("arc2row_list_paged_count", this.arc2rowListPagedExtraParams)
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
			arc2row_list_paged: Arc2Data.find(databaseUtils.extendFilter({}, this.arc2rowListPagedExtraParams), databaseUtils.extendOptions({}, this.arc2rowListPagedExtraParams)),
			arc2row_list_paged_count: Counts.get("arc2row_list_paged_count")
		};
		

		
		data.arc2row_list_paged_page_count = this.arc2rowListPagedExtraParams && this.arc2rowListPagedExtraParams.pageSize ? Math.ceil(data.arc2row_list_paged_count / this.arc2rowListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.arc2rowListPagedExtraParams.pageNo >= data.arc2row_list_paged_page_count) {
			Session.set("Arc2rowListPagedPageNo", data.arc2row_list_paged_page_count > 0 ? data.arc2row_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});