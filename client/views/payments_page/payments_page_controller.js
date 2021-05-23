this.PaymentsPageController = RouteController.extend({
	template: "PaymentsPage",
	

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
		this.paymentListPagedExtraParams = {
			searchText: Session.get("PaymentListPagedSearchString") || "",
			searchFields: Session.get("PaymentListPagedSearchFields") || ["mobile_num", "call_time", "mpesa_code", "mpesa_name", "order_number", "amount_paid"],
			sortBy: Session.get("PaymentListPagedSortBy") || "",
			sortAscending: Session.get("PaymentListPagedSortAscending"),
			pageNo: Session.get("PaymentListPagedPageNo") || 0,
			pageSize: Session.get("PaymentListPagedPageSize") || 25
		};



		

		var subs = [
			Meteor.subscribe("payment_list_paged", this.paymentListPagedExtraParams),
			Meteor.subscribe("payment_list_paged_count", this.paymentListPagedExtraParams)
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
			payment_list_paged: Payments.find(databaseUtils.extendFilter({}, this.paymentListPagedExtraParams), databaseUtils.extendOptions({}, this.paymentListPagedExtraParams)),
			payment_list_paged_count: Counts.get("payment_list_paged_count")
		};
		

		
		data.payment_list_paged_page_count = this.paymentListPagedExtraParams && this.paymentListPagedExtraParams.pageSize ? Math.ceil(data.payment_list_paged_count / this.paymentListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.paymentListPagedExtraParams.pageNo >= data.payment_list_paged_page_count) {
			Session.set("PaymentListPagedPageNo", data.payment_list_paged_page_count > 0 ? data.payment_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});