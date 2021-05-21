this.ContractReviewPageController = RouteController.extend({
	template: "ContractReviewPage",
	

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
		this.contractReviewListPagedExtraParams = {
			searchText: Session.get("ContractReviewListPagedSearchString") || "",
			searchFields: Session.get("ContractReviewListPagedSearchFields") || ["value_chain", "Contract", "StartDay", "ContractEndDate", "GermDryPayPct", "GermWetPayPct", "VegDryPayPct", "FlowerPayPct", "ExcessRainPayPct", "SumInsured", "TotalPayPct", "ActualPayPct", "ActualPay"],
			sortBy: Session.get("ContractReviewListPagedSortBy") || "",
			sortAscending: Session.get("ContractReviewListPagedSortAscending"),
			pageNo: Session.get("ContractReviewListPagedPageNo") || 0,
			pageSize: Session.get("ContractReviewListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("contract_review_list_paged", this.contractReviewListPagedExtraParams),
			Meteor.subscribe("contract_review_list_paged_count", this.contractReviewListPagedExtraParams)
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
			contract_review_list_paged: ContractReview.find(databaseUtils.extendFilter({}, this.contractReviewListPagedExtraParams), databaseUtils.extendOptions({}, this.contractReviewListPagedExtraParams)),
			contract_review_list_paged_count: Counts.get("contract_review_list_paged_count")
		};
		

		
		data.contract_review_list_paged_page_count = this.contractReviewListPagedExtraParams && this.contractReviewListPagedExtraParams.pageSize ? Math.ceil(data.contract_review_list_paged_count / this.contractReviewListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.contractReviewListPagedExtraParams.pageNo >= data.contract_review_list_paged_page_count) {
			Session.set("ContractReviewListPagedPageNo", data.contract_review_list_paged_page_count > 0 ? data.contract_review_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});