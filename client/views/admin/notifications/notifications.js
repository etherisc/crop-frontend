Template.AdminNotifications.onCreated(function() {
	
});

Template.AdminNotifications.onDestroyed(function() {
	
});

Template.AdminNotifications.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminNotifications.events({
	
});

Template.AdminNotifications.helpers({
	
});


var AdminNotificationsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("NotificationListPagedSearchString") || "",
		searchFields: Session.get("NotificationListPagedSearchFields") || ["title", "text", "filter", "recurring", "start_date", "end_date", "time", "last_run", "status", "message"],
		sortBy: Session.get("NotificationListPagedSortBy") || "",
		sortAscending: Session.get("NotificationListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("notificationListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminNotificationsView.onCreated(function() {
	
});

Template.AdminNotificationsView.onDestroyed(function() {
	
});

Template.AdminNotificationsView.onRendered(function() {
	Session.set("AdminNotificationsViewStyle", "table");
	
});

Template.AdminNotificationsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).closest("form");
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				Session.set("NotificationListPagedSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					Session.set("NotificationListPagedSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).closest("form");
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					Session.set("NotificationListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.notifications.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminNotificationsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminNotificationsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminNotificationsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminNotificationsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("NotificationListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("NotificationListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("NotificationListPagedPageNo") || 0;
		if(currentPage < this.notification_list_paged_page_count - 1) {
			Session.set("NotificationListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminNotificationsView.helpers({

	"insertButtonClass": function() {
		return Notifications.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.notification_list_paged || this.notification_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.notification_list_paged && this.notification_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.notification_list_paged && this.notification_list_paged.count() == 0 && Session.get("NotificationListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("NotificationListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("NotificationListPagedPageNo") || 0) < this.notification_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("NotificationListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminNotificationsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminNotificationsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminNotificationsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminNotificationsViewStyle") == "gallery";
	}

	
});


Template.AdminNotificationsViewTable.onCreated(function() {
	
});

Template.AdminNotificationsViewTable.onDestroyed(function() {
	
});

Template.AdminNotificationsViewTable.onRendered(function() {
	
});

Template.AdminNotificationsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("NotificationListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("NotificationListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("NotificationListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("NotificationListPagedSortAscending", !sortAscending);
		} else {
			Session.set("NotificationListPagedSortAscending", true);
		}
	}
});

Template.AdminNotificationsViewTable.helpers({
});


Template.AdminNotificationsViewTableItems.onCreated(function() {
	
});

Template.AdminNotificationsViewTableItems.onDestroyed(function() {
	
});

Template.AdminNotificationsViewTableItems.onRendered(function() {
	
});

Template.AdminNotificationsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("admin.notifications.details", mergeObjects(Router.currentRouteParams(), {notificationId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("notificationsUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("notificationsRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.notifications.update", mergeObjects(Router.currentRouteParams(), {notificationId: this._id}));
		return false;
	}
});

Template.AdminNotificationsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Notifications.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Notifications.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
