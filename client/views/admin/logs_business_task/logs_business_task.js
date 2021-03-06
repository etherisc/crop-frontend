Template.AdminLogsBusinessTask.onCreated(function() {
	
});

Template.AdminLogsBusinessTask.onDestroyed(function() {
	
});

Template.AdminLogsBusinessTask.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminLogsBusinessTask.events({
	
});

Template.AdminLogsBusinessTask.helpers({
	
});


var AdminLogsBusinessTaskViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("BtxLineListPagedSearchString") || "",
		searchFields: Session.get("BtxLineListPagedSearchFields") || ["timestamp", "process_name", "business_tx_id", "business_tx_status", "task_name", "task_id", "task_status", "message"],
		sortBy: Session.get("BtxLineListPagedSortBy") || "",
		sortAscending: Session.get("BtxLineListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("btxLineListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminLogsBusinessTaskView.onCreated(function() {
	
});

Template.AdminLogsBusinessTaskView.onDestroyed(function() {
	
});

Template.AdminLogsBusinessTaskView.onRendered(function() {
	Session.set("AdminLogsBusinessTaskViewStyle", "table");
	
});

Template.AdminLogsBusinessTaskView.events({
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
				Session.set("BtxLineListPagedSearchString", searchString);
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
					Session.set("BtxLineListPagedSearchString", searchString);
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
					Session.set("BtxLineListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminLogsBusinessTaskViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminLogsBusinessTaskViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminLogsBusinessTaskViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminLogsBusinessTaskViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("BtxLineListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("BtxLineListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("BtxLineListPagedPageNo") || 0;
		if(currentPage < this.btx_line_list_paged_page_count - 1) {
			Session.set("BtxLineListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminLogsBusinessTaskView.helpers({

	"insertButtonClass": function() {
		return BusinessTransactionLog.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.btx_line_list_paged || this.btx_line_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.btx_line_list_paged && this.btx_line_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.btx_line_list_paged && this.btx_line_list_paged.count() == 0 && Session.get("BtxLineListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("BtxLineListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("BtxLineListPagedPageNo") || 0) < this.btx_line_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("BtxLineListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminLogsBusinessTaskViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminLogsBusinessTaskViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminLogsBusinessTaskViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminLogsBusinessTaskViewStyle") == "gallery";
	}

	
});


Template.AdminLogsBusinessTaskViewTable.onCreated(function() {
	
});

Template.AdminLogsBusinessTaskViewTable.onDestroyed(function() {
	
});

Template.AdminLogsBusinessTaskViewTable.onRendered(function() {
	
});

Template.AdminLogsBusinessTaskViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("BtxLineListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("BtxLineListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("BtxLineListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("BtxLineListPagedSortAscending", !sortAscending);
		} else {
			Session.set("BtxLineListPagedSortAscending", true);
		}
	}
});

Template.AdminLogsBusinessTaskViewTable.helpers({
});


Template.AdminLogsBusinessTaskViewTableItems.onCreated(function() {
	
});

Template.AdminLogsBusinessTaskViewTableItems.onDestroyed(function() {
	
});

Template.AdminLogsBusinessTaskViewTableItems.onRendered(function() {
	
});

Template.AdminLogsBusinessTaskViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("admin.logs_business_task.details", mergeObjects(Router.currentRouteParams(), {btxLineId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("businessTransactionLogUpdate", this._id, values, function(err, res) {
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
						Meteor.call("businessTransactionLogRemove", me._id, function(err, res) {
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
		/**/
		return false;
	}
});

Template.AdminLogsBusinessTaskViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return BusinessTransactionLog.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return BusinessTransactionLog.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
