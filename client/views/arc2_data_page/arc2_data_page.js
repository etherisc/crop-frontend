Template.Arc2DataPage.onCreated(function() {
	
});

Template.Arc2DataPage.onDestroyed(function() {
	
});

Template.Arc2DataPage.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Arc2DataPage.events({
	
});

Template.Arc2DataPage.helpers({
	
});

Template.Arc2DataPageHeader.created = function() {

};

Template.Arc2DataPageHeader.destroyed = function() {

};

Template.Arc2DataPageHeader.rendered = function() {

};

Template.Arc2DataPageHeader.helpers({

});

Template.Arc2DataPageHeader.events({

});


var Arc2DataPageViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("Arc2rowListPagedSearchString") || "",
		searchFields: Session.get("Arc2rowListPagedSearchFields") || ["pixel", "pixel_date", "Y1983", "_dummy", "Y2010", "Y2011", "Y2012", "Y2013", "Y2014", "Y2015", "Y2016", "Y2017", "Y2018", "Y2019"],
		sortBy: Session.get("Arc2rowListPagedSortBy") || "",
		sortAscending: Session.get("Arc2rowListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("arc2rowListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.Arc2DataPageView.onCreated(function() {
	
});

Template.Arc2DataPageView.onDestroyed(function() {
	
});

Template.Arc2DataPageView.onRendered(function() {
	Session.set("Arc2DataPageViewStyle", "table");
	
});

Template.Arc2DataPageView.events({
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
				Session.set("Arc2rowListPagedSearchString", searchString);
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
					Session.set("Arc2rowListPagedSearchString", searchString);
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
					Session.set("Arc2rowListPagedSearchString", "");
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
		Arc2DataPageViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		Arc2DataPageViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		Arc2DataPageViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		Arc2DataPageViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("Arc2rowListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("Arc2rowListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("Arc2rowListPagedPageNo") || 0;
		if(currentPage < this.arc2row_list_paged_page_count - 1) {
			Session.set("Arc2rowListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.Arc2DataPageView.helpers({

	"insertButtonClass": function() {
		return XArc2Data.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.arc2row_list_paged || this.arc2row_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.arc2row_list_paged && this.arc2row_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.arc2row_list_paged && this.arc2row_list_paged.count() == 0 && Session.get("Arc2rowListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("Arc2rowListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("Arc2rowListPagedPageNo") || 0) < this.arc2row_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("Arc2rowListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("Arc2DataPageViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("Arc2DataPageViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("Arc2DataPageViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("Arc2DataPageViewStyle") == "gallery";
	}, 

		});

Template.Arc2DataPageViewTableItems.helpers({

"showDummy": function() {
		return "[ . . . ]";
	}

});


Template.Arc2DataPageViewTable.onCreated(function() {
	
});

Template.Arc2DataPageViewTable.onDestroyed(function() {
	
});

Template.Arc2DataPageViewTable.onRendered(function() {
	
});

Template.Arc2DataPageViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("Arc2rowListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("Arc2rowListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("Arc2rowListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("Arc2rowListPagedSortAscending", !sortAscending);
		} else {
			Session.set("Arc2rowListPagedSortAscending", true);
		}
	}
});

Template.Arc2DataPageViewTable.helpers({
});


Template.Arc2DataPageViewTableItems.onCreated(function() {
	
});

Template.Arc2DataPageViewTableItems.onDestroyed(function() {
	
});

Template.Arc2DataPageViewTableItems.onRendered(function() {
	
});

Template.Arc2DataPageViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("arc2_data_page.details", mergeObjects(Router.currentRouteParams(), {arc2rowId: this._id._str}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("xArc2DataUpdate", this._id, values, function(err, res) {
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
						Meteor.call("xArc2DataRemove", me._id, function(err, res) {
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

Template.Arc2DataPageViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return XArc2Data.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return XArc2Data.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
