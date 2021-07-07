Template.Locations.onCreated(function() {
	
});

Template.Locations.onDestroyed(function() {
	
});

Template.Locations.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Locations.events({
	
});

Template.Locations.helpers({
	
});


var LocationsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("LocationListPagedSearchString") || "",
		searchFields: Session.get("LocationListPagedSearchFields") || ["prefix", "source", "county", "ward", "pixel", "latitude", "longitude", "site_table_entry"],
		sortBy: Session.get("LocationListPagedSortBy") || "",
		sortAscending: Session.get("LocationListPagedSortAscending") || true
	};

	var exportFields = ["pixel"];

	

	Meteor.call("locationListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.LocationsView.onCreated(function() {
	
});

Template.LocationsView.onDestroyed(function() {
	
});

Template.LocationsView.onRendered(function() {
	Session.set("LocationsViewStyle", "table");
	
});

Template.LocationsView.events({
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
				Session.set("LocationListPagedSearchString", searchString);
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
					Session.set("LocationListPagedSearchString", searchString);
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
					Session.set("LocationListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("locations.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		LocationsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		LocationsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		LocationsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		LocationsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("LocationListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("LocationListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("LocationListPagedPageNo") || 0;
		if(currentPage < this.location_list_paged_page_count - 1) {
			Session.set("LocationListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.LocationsView.helpers({

	"insertButtonClass": function() {
		return Locations.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.location_list_paged || this.location_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.location_list_paged && this.location_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.location_list_paged && this.location_list_paged.count() == 0 && Session.get("LocationListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("LocationListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("LocationListPagedPageNo") || 0) < this.location_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("LocationListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("LocationsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("LocationsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("LocationsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("LocationsViewStyle") == "gallery";
	}

	
});


Template.LocationsViewTable.onCreated(function() {
	
});

Template.LocationsViewTable.onDestroyed(function() {
	
});

Template.LocationsViewTable.onRendered(function() {
	
});

Template.LocationsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("LocationListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("LocationListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("LocationListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("LocationListPagedSortAscending", !sortAscending);
		} else {
			Session.set("LocationListPagedSortAscending", true);
		}
	}
});

Template.LocationsViewTable.helpers({
});


Template.LocationsViewTableItems.onCreated(function() {
	
});

Template.LocationsViewTableItems.onDestroyed(function() {
	
});

Template.LocationsViewTableItems.onRendered(function() {
	
});

Template.LocationsViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("locations.details", mergeObjects(Router.currentRouteParams(), {locationId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("locationsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("locationsRemove", me._id, function(err, res) {
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
		Router.go("locations.update", mergeObjects(Router.currentRouteParams(), {locationId: this._id}));
		return false;
	}
});

Template.LocationsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Locations.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Locations.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
