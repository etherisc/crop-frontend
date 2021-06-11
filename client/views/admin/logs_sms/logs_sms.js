Template.AdminLogsSms.onCreated(function() {
	
});

Template.AdminLogsSms.onDestroyed(function() {
	
});

Template.AdminLogsSms.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminLogsSms.events({
	
});

Template.AdminLogsSms.helpers({
	
});


var AdminLogsSmsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LoglineSmsListPagedSearchString") || "",
		searchFields: Session.get("LoglineSmsListPagedSearchFields") || ["timestamp", "mobile_num", "message", "status", "status_message", "unique_id", "credits", "delivery_status_desc", "date_received"],
		sortBy: Session.get("LoglineSmsListPagedSortBy") || "",
		sortAscending: Session.get("LoglineSmsListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("loglineSmsListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminLogsSmsView.onCreated(function() {
	
});

Template.AdminLogsSmsView.onDestroyed(function() {
	
});

Template.AdminLogsSmsView.onRendered(function() {
	Session.set("AdminLogsSmsViewStyle", "table");
	
});

Template.AdminLogsSmsView.events({
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
				Session.set("LoglineSmsListPagedSearchString", searchString);
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
					Session.set("LoglineSmsListPagedSearchString", searchString);
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
					Session.set("LoglineSmsListPagedSearchString", "");
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
		AdminLogsSmsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminLogsSmsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminLogsSmsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminLogsSmsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LoglineSmsListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LoglineSmsListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LoglineSmsListPagedPageNo") || 0;
		if(currentPage < this.logline_sms_list_paged_page_count - 1) {
			Session.set("LoglineSmsListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminLogsSmsView.helpers({

	"insertButtonClass": function() {
		return Sms.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.logline_sms_list_paged || this.logline_sms_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.logline_sms_list_paged && this.logline_sms_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.logline_sms_list_paged && this.logline_sms_list_paged.count() == 0 && Session.get("LoglineSmsListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LoglineSmsListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LoglineSmsListPagedPageNo") || 0) < this.logline_sms_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LoglineSmsListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminLogsSmsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminLogsSmsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminLogsSmsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminLogsSmsViewStyle") == "gallery";
	}

	
});


Template.AdminLogsSmsViewTable.onCreated(function() {
	
});

Template.AdminLogsSmsViewTable.onDestroyed(function() {
	
});

Template.AdminLogsSmsViewTable.onRendered(function() {
	
});

Template.AdminLogsSmsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LoglineSmsListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LoglineSmsListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LoglineSmsListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LoglineSmsListPagedSortAscending", !sortAscending);
		} else {
			Session.set("LoglineSmsListPagedSortAscending", true);
		}
	}
});

Template.AdminLogsSmsViewTable.helpers({
});


Template.AdminLogsSmsViewTableItems.onCreated(function() {
	
});

Template.AdminLogsSmsViewTableItems.onDestroyed(function() {
	
});

Template.AdminLogsSmsViewTableItems.onRendered(function() {
	
});

Template.AdminLogsSmsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("admin.logs_sms.details", mergeObjects(Router.currentRouteParams(), {loglineSmsId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("smsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("smsRemove", me._id, function(err, res) {
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

Template.AdminLogsSmsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Sms.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Sms.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
