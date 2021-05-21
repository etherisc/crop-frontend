Template.AuditPage.onCreated(function() {
	
});

Template.AuditPage.onDestroyed(function() {
	
});

Template.AuditPage.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AuditPage.events({
	
});

Template.AuditPage.helpers({
	
});

Template.AuditPageHeader.created = function() {

};

Template.AuditPageHeader.destroyed = function() {

};

Template.AuditPageHeader.rendered = function() {

};

Template.AuditPageHeader.helpers({

});

Template.AuditPageHeader.events({

});


var AuditPageAuditTrailViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("AuditTrailListPagedSearchString") || "",
		searchFields: Session.get("AuditTrailListPagedSearchFields") || ["type", "message", "user", "hash"],
		sortBy: Session.get("AuditTrailListPagedSortBy") || "",
		sortAscending: Session.get("AuditTrailListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("auditTrailListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AuditPageAuditTrailView.onCreated(function() {
	
});

Template.AuditPageAuditTrailView.onDestroyed(function() {
	
});

Template.AuditPageAuditTrailView.onRendered(function() {
	Session.set("AuditPageAuditTrailViewStyle", "table");
	
});

Template.AuditPageAuditTrailView.events({
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
				Session.set("AuditTrailListPagedSearchString", searchString);
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
					Session.set("AuditTrailListPagedSearchString", searchString);
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
					Session.set("AuditTrailListPagedSearchString", "");
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
		AuditPageAuditTrailViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AuditPageAuditTrailViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AuditPageAuditTrailViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AuditPageAuditTrailViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("AuditTrailListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("AuditTrailListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("AuditTrailListPagedPageNo") || 0;
		if(currentPage < this.audit_trail_list_paged_page_count - 1) {
			Session.set("AuditTrailListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AuditPageAuditTrailView.helpers({

	"insertButtonClass": function() {
		return AuditTrail.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.audit_trail_list_paged || this.audit_trail_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.audit_trail_list_paged && this.audit_trail_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.audit_trail_list_paged && this.audit_trail_list_paged.count() == 0 && Session.get("AuditTrailListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("AuditTrailListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("AuditTrailListPagedPageNo") || 0) < this.audit_trail_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("AuditTrailListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AuditPageAuditTrailViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AuditPageAuditTrailViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AuditPageAuditTrailViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AuditPageAuditTrailViewStyle") == "gallery";
	}

	
});


Template.AuditPageAuditTrailViewTable.onCreated(function() {
	
});

Template.AuditPageAuditTrailViewTable.onDestroyed(function() {
	
});

Template.AuditPageAuditTrailViewTable.onRendered(function() {
	
});

Template.AuditPageAuditTrailViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("AuditTrailListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("AuditTrailListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("AuditTrailListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("AuditTrailListPagedSortAscending", !sortAscending);
		} else {
			Session.set("AuditTrailListPagedSortAscending", true);
		}
	}
});

Template.AuditPageAuditTrailViewTable.helpers({
});


Template.AuditPageAuditTrailViewTableItems.onCreated(function() {
	
});

Template.AuditPageAuditTrailViewTableItems.onDestroyed(function() {
	
});

Template.AuditPageAuditTrailViewTableItems.onRendered(function() {
	
});

Template.AuditPageAuditTrailViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
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

		Meteor.call("auditTrailUpdate", this._id, values, function(err, res) {
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
						Meteor.call("auditTrailRemove", me._id, function(err, res) {
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

Template.AuditPageAuditTrailViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return AuditTrail.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return AuditTrail.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
