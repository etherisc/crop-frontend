this.PartnersController = RouteController.extend({
	template: "Partners",
	

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
		this.partnerListPagedExtraParams = {
			searchText: Session.get("PartnerListPagedSearchString") || "",
			searchFields: Session.get("PartnerListPagedSearchFields") || ["id", "firstName", "lastName", "mobile_num", "is_signed", "tx_hash"],
			sortBy: Session.get("PartnerListPagedSortBy") || "",
			sortAscending: Session.get("PartnerListPagedSortAscending"),
			pageNo: Session.get("PartnerListPagedPageNo") || 0,
			pageSize: Session.get("PartnerListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("partner_list_paged", this.partnerListPagedExtraParams),
			Meteor.subscribe("partner_list_paged_count", this.partnerListPagedExtraParams)
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
			partner_list_paged: Partners.find(databaseUtils.extendFilter({}, this.partnerListPagedExtraParams), databaseUtils.extendOptions({}, this.partnerListPagedExtraParams)),
			partner_list_paged_count: Counts.get("partner_list_paged_count")
		};
		

		
		data.partner_list_paged_page_count = this.partnerListPagedExtraParams && this.partnerListPagedExtraParams.pageSize ? Math.ceil(data.partner_list_paged_count / this.partnerListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.partnerListPagedExtraParams.pageNo >= data.partner_list_paged_page_count) {
			Session.set("PartnerListPagedPageNo", data.partner_list_paged_page_count > 0 ? data.partner_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});