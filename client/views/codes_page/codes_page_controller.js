this.CodesPageController = RouteController.extend({
	template: "CodesPage",
	

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
		this.codeListPagedExtraParams = {
			searchText: Session.get("CodeListPagedSearchString") || "",
			searchFields: Session.get("CodeListPagedSearchFields") || ["id", "codeType", "name"],
			sortBy: Session.get("CodeListPagedSortBy") || "",
			sortAscending: Session.get("CodeListPagedSortAscending"),
			pageNo: Session.get("CodeListPagedPageNo") || 0,
			pageSize: Session.get("CodeListPagedPageSize") || 20
		};



		

		var subs = [
			Meteor.subscribe("code_list_paged", this.codeListPagedExtraParams),
			Meteor.subscribe("code_list_paged_count", this.codeListPagedExtraParams)
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
			code_list_paged: XCodes.find(databaseUtils.extendFilter({}, this.codeListPagedExtraParams), databaseUtils.extendOptions({}, this.codeListPagedExtraParams)),
			code_list_paged_count: Counts.get("code_list_paged_count")
		};
		

		
		data.code_list_paged_page_count = this.codeListPagedExtraParams && this.codeListPagedExtraParams.pageSize ? Math.ceil(data.code_list_paged_count / this.codeListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.codeListPagedExtraParams.pageNo >= data.code_list_paged_page_count) {
			Session.set("CodeListPagedPageNo", data.code_list_paged_page_count > 0 ? data.code_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});