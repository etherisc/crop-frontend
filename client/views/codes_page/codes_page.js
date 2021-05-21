Template.CodesPage.onCreated(function() {
	
});

Template.CodesPage.onDestroyed(function() {
	
});

Template.CodesPage.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CodesPage.events({
	
});

Template.CodesPage.helpers({
	
});

Template.CodesPageHeader.created = function() {

};

Template.CodesPageHeader.destroyed = function() {

};

Template.CodesPageHeader.rendered = function() {

};

Template.CodesPageHeader.helpers({

});

Template.CodesPageHeader.events({

});


var CodesPageViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("CodeListPagedSearchString") || "",
		searchFields: Session.get("CodeListPagedSearchFields") || ["id", "codeType", "name"],
		sortBy: Session.get("CodeListPagedSortBy") || "",
		sortAscending: Session.get("CodeListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("codeListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.CodesPageView.onCreated(function() {
	
});

Template.CodesPageView.onDestroyed(function() {
	
});

Template.CodesPageView.onRendered(function() {
	Session.set("CodesPageViewStyle", "table");
	
});

Template.CodesPageView.events({
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
				Session.set("CodeListPagedSearchString", searchString);
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
					Session.set("CodeListPagedSearchString", searchString);
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
					Session.set("CodeListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("codes_page.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CodesPageViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CodesPageViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CodesPageViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CodesPageViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("CodeListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("CodeListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("CodeListPagedPageNo") || 0;
		if(currentPage < this.code_list_paged_page_count - 1) {
			Session.set("CodeListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.CodesPageView.helpers({

	"insertButtonClass": function() {
		return Codes.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.code_list_paged || this.code_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.code_list_paged && this.code_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.code_list_paged && this.code_list_paged.count() == 0 && Session.get("CodeListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("CodeListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("CodeListPagedPageNo") || 0) < this.code_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("CodeListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("CodesPageViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("CodesPageViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("CodesPageViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("CodesPageViewStyle") == "gallery";
	}

	
});


Template.CodesPageViewTable.onCreated(function() {
	
});

Template.CodesPageViewTable.onDestroyed(function() {
	
});

Template.CodesPageViewTable.onRendered(function() {
	
});

Template.CodesPageViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("CodeListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("CodeListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("CodeListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("CodeListPagedSortAscending", !sortAscending);
		} else {
			Session.set("CodeListPagedSortAscending", true);
		}
	}
});

Template.CodesPageViewTable.helpers({
});


Template.CodesPageViewTableItems.onCreated(function() {
	
});

Template.CodesPageViewTableItems.onDestroyed(function() {
	
});

Template.CodesPageViewTableItems.onRendered(function() {
	
});

Template.CodesPageViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("codes_page.details", mergeObjects(Router.currentRouteParams(), {codeId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("codesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("codesRemove", me._id, function(err, res) {
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
		Router.go("codes_page.update", mergeObjects(Router.currentRouteParams(), {codeId: this._id}));
		return false;
	}
});

Template.CodesPageViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Codes.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Codes.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.CodesPageFooter.created = function() {

};

Template.CodesPageFooter.destroyed = function() {

};

Template.CodesPageFooter.rendered = function() {

};

Template.CodesPageFooter.helpers({

});

Template.CodesPageFooter.events({

});
