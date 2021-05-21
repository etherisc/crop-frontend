this.AuditPageController = RouteController.extend({
	template: "AuditPage",
	

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
		this.auditTrailListPagedExtraParams = {
			searchText: Session.get("AuditTrailListPagedSearchString") || "",
			searchFields: Session.get("AuditTrailListPagedSearchFields") || ["type", "message", "user", "hash"],
			sortBy: Session.get("AuditTrailListPagedSortBy") || "",
			sortAscending: Session.get("AuditTrailListPagedSortAscending"),
			pageNo: Session.get("AuditTrailListPagedPageNo") || 0,
			pageSize: Session.get("AuditTrailListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("audit_trail_list_paged", this.auditTrailListPagedExtraParams),
			Meteor.subscribe("audit_trail_list_paged_count", this.auditTrailListPagedExtraParams)
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
			audit_trail_list_paged: AuditTrail.find(databaseUtils.extendFilter({}, this.auditTrailListPagedExtraParams), databaseUtils.extendOptions({}, this.auditTrailListPagedExtraParams)),
			audit_trail_list_paged_count: Counts.get("audit_trail_list_paged_count")
		};
		

		
		data.audit_trail_list_paged_page_count = this.auditTrailListPagedExtraParams && this.auditTrailListPagedExtraParams.pageSize ? Math.ceil(data.audit_trail_list_paged_count / this.auditTrailListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.auditTrailListPagedExtraParams.pageNo >= data.audit_trail_list_paged_page_count) {
			Session.set("AuditTrailListPagedPageNo", data.audit_trail_list_paged_page_count > 0 ? data.audit_trail_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});