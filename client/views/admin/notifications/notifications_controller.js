this.AdminNotificationsController = RouteController.extend({
	template: "Admin",
	

	yieldTemplates: {
		'AdminNotifications': { to: 'AdminSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Admin"); this.render("loading", { to: "AdminSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		this.notificationListPagedExtraParams = {
			searchText: Session.get("NotificationListPagedSearchString") || "",
			searchFields: Session.get("NotificationListPagedSearchFields") || ["title", "text", "filter", "recurring", "start_date", "end_date", "time", "last_run", "status", "message"],
			sortBy: Session.get("NotificationListPagedSortBy") || "",
			sortAscending: Session.get("NotificationListPagedSortAscending"),
			pageNo: Session.get("NotificationListPagedPageNo") || 0,
			pageSize: Session.get("NotificationListPagedPageSize") || 0
		};



		

		var subs = [
			Meteor.subscribe("notification_list_paged", this.notificationListPagedExtraParams),
			Meteor.subscribe("notification_list_paged_count", this.notificationListPagedExtraParams)
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
			notification_list_paged: Notifications.find(databaseUtils.extendFilter({}, this.notificationListPagedExtraParams), databaseUtils.extendOptions({}, this.notificationListPagedExtraParams)),
			notification_list_paged_count: Counts.get("notification_list_paged_count")
		};
		

		
		data.notification_list_paged_page_count = this.notificationListPagedExtraParams && this.notificationListPagedExtraParams.pageSize ? Math.ceil(data.notification_list_paged_count / this.notificationListPagedExtraParams.pageSize) : 1;
		if(this.isReady() && this.notificationListPagedExtraParams.pageNo >= data.notification_list_paged_page_count) {
			Session.set("NotificationListPagedPageNo", data.notification_list_paged_page_count > 0 ? data.notification_list_paged_page_count - 1 : 0);
		}


		return data;
	},

	onAfterAction: function() {
		
	}
});