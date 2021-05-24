Template.AdminLogsBrowser.onCreated(function() {
	
});

Template.AdminLogsBrowser.onDestroyed(function() {
	
});

Template.AdminLogsBrowser.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminLogsBrowser.events({
	
});

Template.AdminLogsBrowser.helpers({
	
});


var AdminLogsBrowserLogsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LoglinePagedSearchString") || "",
		searchFields: Session.get("LoglinePagedSearchFields") || ["timestamp", "type", "source", "message", "args"],
		sortBy: Session.get("LoglinePagedSortBy") || "",
		sortAscending: Session.get("LoglinePagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("loglinePagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminLogsBrowserLogsView.onCreated(function() {
	
});

Template.AdminLogsBrowserLogsView.onDestroyed(function() {
	
});

Template.AdminLogsBrowserLogsView.onRendered(function() {
	Session.set("AdminLogsBrowserLogsViewStyle", "table");
	
});

Template.AdminLogsBrowserLogsView.events({
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
				Session.set("LoglinePagedSearchString", searchString);
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
					Session.set("LoglinePagedSearchString", searchString);
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
					Session.set("LoglinePagedSearchString", "");
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
		AdminLogsBrowserLogsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminLogsBrowserLogsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminLogsBrowserLogsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminLogsBrowserLogsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LoglinePagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LoglinePagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LoglinePagedPageNo") || 0;
		if(currentPage < this.logline_paged_page_count - 1) {
			Session.set("LoglinePagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminLogsBrowserLogsView.helpers({

	"insertButtonClass": function() {
		return Logs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.logline_paged || this.logline_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.logline_paged && this.logline_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.logline_paged && this.logline_paged.count() == 0 && Session.get("LoglinePagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LoglinePagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LoglinePagedPageNo") || 0) < this.logline_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LoglinePagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminLogsBrowserLogsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminLogsBrowserLogsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminLogsBrowserLogsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminLogsBrowserLogsViewStyle") == "gallery";
	}

	
});


Template.AdminLogsBrowserLogsViewTable.onCreated(function() {
	
});

Template.AdminLogsBrowserLogsViewTable.onDestroyed(function() {
	
});

Template.AdminLogsBrowserLogsViewTable.onRendered(function() {
	
});

Template.AdminLogsBrowserLogsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LoglinePagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LoglinePagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LoglinePagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LoglinePagedSortAscending", !sortAscending);
		} else {
			Session.set("LoglinePagedSortAscending", true);
		}
	}
});

Template.AdminLogsBrowserLogsViewTable.helpers({
});


Template.AdminLogsBrowserLogsViewTableItems.onCreated(function() {
	
});

Template.AdminLogsBrowserLogsViewTableItems.onDestroyed(function() {
	
});

Template.AdminLogsBrowserLogsViewTableItems.onRendered(function() {
	
});

Template.AdminLogsBrowserLogsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		$(document).on('click', '.modal-backdrop', function (event) {
    bootbox.hideAll();
});

bootbox.dialog({
	title: 'LogLine Details',
	size:'large',
	message: "<div id='dialogNode'></div>",
	buttons: {
		close: {
			label: "Close",
			className: "btn btn-info"
		}
	}
});

Blaze.renderWithData(Template.AdminDetailsModalForm, {logline: t.data}, $("#dialogNode")[0]);

		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("logsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("logsRemove", me._id, function(err, res) {
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

Template.AdminLogsBrowserLogsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Logs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Logs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.AdminLogsBrowserLogsViewCustomActions.created = function() {

};

Template.AdminLogsBrowserLogsViewCustomActions.destroyed = function() {

};

Template.AdminLogsBrowserLogsViewCustomActions.rendered = function() {

};

Template.AdminLogsBrowserLogsViewCustomActions.helpers({

});

Template.AdminLogsBrowserLogsViewCustomActions.events({
	"click #btn-clear": function (e,t) {
		e.preventDefault();

		Meteor.call('logger.clear', {source: 'browser'});
	}


});
