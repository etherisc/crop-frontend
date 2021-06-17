this.PayoutsDemoController = RouteController.extend({
	template: "PayoutsDemo",
	

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
		this.payout2ListPagedExtraParams = {
			searchText: Session.get("Payout2ListPagedSearchString") || "",
			searchFields: Session.get("Payout2ListPagedSearchFields") || ["name", "mobile_number", "sum_insured", "order_number", "value_chain", "start_date", "pixel", "end_date", "germ_wet_pay", "germ_dry_pay", "veg_wet_pay", "veg_dry_pay", "flower_pay", "excess_rain_pay"],
			sortBy: Session.get("Payout2ListPagedSortBy") || "",
			sortAscending: Session.get("Payout2ListPagedSortAscending"),
			pageNo: Session.get("Payout2ListPagedPageNo") || 0,
			pageSize: Session.get("Payout2ListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("payout_2_list_paged", this.payout2ListPagedExtraParams),
			Meteor.subscribe("payout_2_list_paged_count", this.payout2ListPagedExtraParams)
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
			payout_2_list_paged: XPayouts2.find(databaseUtils.extendFilter({}, this.payout2ListPagedExtraParams), databaseUtils.extendOptions({}, this.payout2ListPagedExtraParams)),
			payout_2_list_paged_count: Counts.get("payout_2_list_paged_count")
		};
		

		
		data.payout_2_list_paged_page_count = this.payout2ListPagedExtraParams && this.payout2ListPagedExtraParams.pageSize ? Math.ceil(data.payout_2_list_paged_count / this.payout2ListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.payout2ListPagedExtraParams.pageNo >= data.payout_2_list_paged_page_count) {
			Session.set("Payout2ListPagedPageNo", data.payout_2_list_paged_page_count > 0 ? data.payout_2_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});