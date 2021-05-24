Template.AdminImportJobs.onCreated(function() {
	
});

Template.AdminImportJobs.onDestroyed(function() {
	
});

Template.AdminImportJobs.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminImportJobs.events({
	
});

Template.AdminImportJobs.helpers({
	
});


var AdminImportJobsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("ImportJobListPagedSearchString") || "",
		searchFields: Session.get("ImportJobListPagedSearchFields") || ["bucket", "filename", "action", "prefix", "status", "last_run"],
		sortBy: Session.get("ImportJobListPagedSortBy") || "",
		sortAscending: Session.get("ImportJobListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("importJobListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminImportJobsView.onCreated(function() {
	
});

Template.AdminImportJobsView.onDestroyed(function() {
	
});

Template.AdminImportJobsView.onRendered(function() {
	Session.set("AdminImportJobsViewStyle", "table");
	
});

Template.AdminImportJobsView.events({
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
				Session.set("ImportJobListPagedSearchString", searchString);
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
					Session.set("ImportJobListPagedSearchString", searchString);
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
					Session.set("ImportJobListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.import_jobs.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminImportJobsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminImportJobsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminImportJobsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminImportJobsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("ImportJobListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("ImportJobListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("ImportJobListPagedPageNo") || 0;
		if(currentPage < this.import_job_list_paged_page_count - 1) {
			Session.set("ImportJobListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminImportJobsView.helpers({

	"insertButtonClass": function() {
		return ImportJobs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.import_job_list_paged || this.import_job_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.import_job_list_paged && this.import_job_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.import_job_list_paged && this.import_job_list_paged.count() == 0 && Session.get("ImportJobListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("ImportJobListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("ImportJobListPagedPageNo") || 0) < this.import_job_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("ImportJobListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminImportJobsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminImportJobsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminImportJobsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminImportJobsViewStyle") == "gallery";
	}

	
});


Template.AdminImportJobsViewTable.onCreated(function() {
	
});

Template.AdminImportJobsViewTable.onDestroyed(function() {
	
});

Template.AdminImportJobsViewTable.onRendered(function() {
	
});

Template.AdminImportJobsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("ImportJobListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("ImportJobListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("ImportJobListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("ImportJobListPagedSortAscending", !sortAscending);
		} else {
			Session.set("ImportJobListPagedSortAscending", true);
		}
	}
});

Template.AdminImportJobsViewTable.helpers({
});


Template.AdminImportJobsViewTableItems.onCreated(function() {
	
});

Template.AdminImportJobsViewTableItems.onDestroyed(function() {
	
});

Template.AdminImportJobsViewTableItems.onRendered(function() {
	
});

Template.AdminImportJobsViewTableItems.events({
	"click [data-action='execute']": function(e, t) {
e.preventDefault();

Meteor.call("readActivationsFile", t.data, function (err, result) {
	alert(`${result} Activations imported.`);
});

return false;

},



	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("admin.import_jobs.details", mergeObjects(Router.currentRouteParams(), {importJobId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("importJobsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("importJobsRemove", me._id, function(err, res) {
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
		Router.go("admin.import_jobs.update", mergeObjects(Router.currentRouteParams(), {importJobId: this._id}));
		return false;
	}
});

Template.AdminImportJobsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return ImportJobs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return ImportJobs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
