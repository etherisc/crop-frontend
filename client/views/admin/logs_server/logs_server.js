Template.AdminLogsServer.onCreated(function() {
	
});

Template.AdminLogsServer.onDestroyed(function() {
	
});

Template.AdminLogsServer.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminLogsServer.events({
	
});

Template.AdminLogsServer.helpers({
	
});


var AdminLogsServerLogsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LoglinesServerPagedSearchString") || "",
		searchFields: Session.get("LoglinesServerPagedSearchFields") || ["timestamp", "type", "source", "message", "args"],
		sortBy: Session.get("LoglinesServerPagedSortBy") || "",
		sortAscending: Session.get("LoglinesServerPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("loglinesServerPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminLogsServerLogsView.onCreated(function() {
	
});

Template.AdminLogsServerLogsView.onDestroyed(function() {
	
});

Template.AdminLogsServerLogsView.onRendered(function() {
	Session.set("AdminLogsServerLogsViewStyle", "table");
	
});

Template.AdminLogsServerLogsView.events({
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
				Session.set("LoglinesServerPagedSearchString", searchString);
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
					Session.set("LoglinesServerPagedSearchString", searchString);
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
					Session.set("LoglinesServerPagedSearchString", "");
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
		AdminLogsServerLogsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminLogsServerLogsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminLogsServerLogsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminLogsServerLogsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LoglinesServerPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LoglinesServerPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LoglinesServerPagedPageNo") || 0;
		if(currentPage < this.loglines_server_paged_page_count - 1) {
			Session.set("LoglinesServerPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminLogsServerLogsView.helpers({

	"insertButtonClass": function() {
		return Logs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.loglines_server_paged || this.loglines_server_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.loglines_server_paged && this.loglines_server_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.loglines_server_paged && this.loglines_server_paged.count() == 0 && Session.get("LoglinesServerPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LoglinesServerPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LoglinesServerPagedPageNo") || 0) < this.loglines_server_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LoglinesServerPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminLogsServerLogsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminLogsServerLogsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminLogsServerLogsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminLogsServerLogsViewStyle") == "gallery";
	}

	
});


Template.AdminLogsServerLogsViewTable.onCreated(function() {
	
});

Template.AdminLogsServerLogsViewTable.onDestroyed(function() {
	
});

Template.AdminLogsServerLogsViewTable.onRendered(function() {
	
});

Template.AdminLogsServerLogsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LoglinesServerPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LoglinesServerPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LoglinesServerPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LoglinesServerPagedSortAscending", !sortAscending);
		} else {
			Session.set("LoglinesServerPagedSortAscending", true);
		}
	}
});

Template.AdminLogsServerLogsViewTable.helpers({
});


Template.AdminLogsServerLogsViewTableItems.onCreated(function() {
	
});

Template.AdminLogsServerLogsViewTableItems.onDestroyed(function() {
	
});

Template.AdminLogsServerLogsViewTableItems.onRendered(function() {
	
});

Template.AdminLogsServerLogsViewTableItems.events({
	

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

Template.AdminLogsServerLogsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Logs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Logs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.AdminLogsServerLogsViewCustomActions.created = function() {

};

Template.AdminLogsServerLogsViewCustomActions.destroyed = function() {

};

Template.AdminLogsServerLogsViewCustomActions.rendered = function() {

};

Template.AdminLogsServerLogsViewCustomActions.helpers({

});

Template.AdminLogsServerLogsViewCustomActions.events({
	"click #btn-clear": function (e,t) {
		e.preventDefault();

		Meteor.call('logger.clear', {source: 'browser'});
	}

});
