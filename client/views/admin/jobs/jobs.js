Template.AdminJobs.onCreated(function() {
	
});

Template.AdminJobs.onDestroyed(function() {
	
});

Template.AdminJobs.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminJobs.events({
	
});

Template.AdminJobs.helpers({
	
});


var AdminJobsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("JobListPagedSearchString") || "",
		searchFields: Session.get("JobListPagedSearchFields") || ["action", "parameters", "status", "message", "last_run"],
		sortBy: Session.get("JobListPagedSortBy") || "",
		sortAscending: Session.get("JobListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("jobListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminJobsView.onCreated(function() {
	
});

Template.AdminJobsView.onDestroyed(function() {
	
});

Template.AdminJobsView.onRendered(function() {
	Session.set("AdminJobsViewStyle", "table");
	
});

Template.AdminJobsView.events({
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
				Session.set("JobListPagedSearchString", searchString);
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
					Session.set("JobListPagedSearchString", searchString);
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
					Session.set("JobListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.jobs.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminJobsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminJobsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminJobsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminJobsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("JobListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("JobListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("JobListPagedPageNo") || 0;
		if(currentPage < this.job_list_paged_page_count - 1) {
			Session.set("JobListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminJobsView.helpers({

	"insertButtonClass": function() {
		return Jobs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.job_list_paged || this.job_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.job_list_paged && this.job_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.job_list_paged && this.job_list_paged.count() == 0 && Session.get("JobListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("JobListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("JobListPagedPageNo") || 0) < this.job_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("JobListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminJobsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminJobsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminJobsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminJobsViewStyle") == "gallery";
	}

	
});


Template.AdminJobsViewTable.onCreated(function() {
	
});

Template.AdminJobsViewTable.onDestroyed(function() {
	
});

Template.AdminJobsViewTable.onRendered(function() {
	
});

Template.AdminJobsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("JobListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("JobListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("JobListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("JobListPagedSortAscending", !sortAscending);
		} else {
			Session.set("JobListPagedSortAscending", true);
		}
	}
});

Template.AdminJobsViewTable.helpers({
});


Template.AdminJobsViewTableItems.onCreated(function() {
	
});

Template.AdminJobsViewTableItems.onDestroyed(function() {
	
});

Template.AdminJobsViewTableItems.onRendered(function() {
	
});

Template.AdminJobsViewTableItems.events({
	"click [data-action='execute']": function(e, t) {
e.preventDefault();

toast_info(`Import Job started. Please be patient, processing can take some time!`);

Meteor.call("executeJob", t.data, function (err, result) {
	if (err) {
		toast_error(`${err} : ${err.error}`);
	} else {
		toast_info(`${result}`);
	}
});

return false;

},



	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("admin.jobs.details", mergeObjects(Router.currentRouteParams(), {jobId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("jobsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("jobsRemove", me._id, function(err, res) {
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
		Router.go("admin.jobs.update", mergeObjects(Router.currentRouteParams(), {jobId: this._id}));
		return false;
	}
});

Template.AdminJobsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Jobs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Jobs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
