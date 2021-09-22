Template.FispFarmers.onCreated(function() {
	
});

Template.FispFarmers.onDestroyed(function() {
	
});

Template.FispFarmers.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.FispFarmers.events({
	
});

Template.FispFarmers.helpers({
	
});


var FispFarmersViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("FispFarmerListPagedSearchString") || "",
		searchFields: Session.get("FispFarmerListPagedSearchFields") || ["name", "camp", "mobile_num", "national_registration_number", "fisp_member", "verified"],
		sortBy: Session.get("FispFarmerListPagedSortBy") || "",
		sortAscending: Session.get("FispFarmerListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("fispFarmerListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.FispFarmersView.onCreated(function() {
	
});

Template.FispFarmersView.onDestroyed(function() {
	
});

Template.FispFarmersView.onRendered(function() {
	Session.set("FispFarmersViewStyle", "table");
	
});

Template.FispFarmersView.events({
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
				Session.set("FispFarmerListPagedSearchString", searchString);
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
					Session.set("FispFarmerListPagedSearchString", searchString);
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
					Session.set("FispFarmerListPagedSearchString", "");
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
		FispFarmersViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		FispFarmersViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		FispFarmersViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		FispFarmersViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("FispFarmerListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("FispFarmerListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("FispFarmerListPagedPageNo") || 0;
		if(currentPage < this.fisp_farmer_list_paged_page_count - 1) {
			Session.set("FispFarmerListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.FispFarmersView.helpers({

	"insertButtonClass": function() {
		return FispFarmers.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.fisp_farmer_list_paged || this.fisp_farmer_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.fisp_farmer_list_paged && this.fisp_farmer_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.fisp_farmer_list_paged && this.fisp_farmer_list_paged.count() == 0 && Session.get("FispFarmerListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("FispFarmerListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("FispFarmerListPagedPageNo") || 0) < this.fisp_farmer_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("FispFarmerListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("FispFarmersViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("FispFarmersViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("FispFarmersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("FispFarmersViewStyle") == "gallery";
	}

	
});


Template.FispFarmersViewTable.onCreated(function() {
	
});

Template.FispFarmersViewTable.onDestroyed(function() {
	
});

Template.FispFarmersViewTable.onRendered(function() {
	
});

Template.FispFarmersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("FispFarmerListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("FispFarmerListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("FispFarmerListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("FispFarmerListPagedSortAscending", !sortAscending);
		} else {
			Session.set("FispFarmerListPagedSortAscending", true);
		}
	}
});

Template.FispFarmersViewTable.helpers({
});


Template.FispFarmersViewTableItems.onCreated(function() {
	
});

Template.FispFarmersViewTableItems.onDestroyed(function() {
	
});

Template.FispFarmersViewTableItems.onRendered(function() {
	
});

Template.FispFarmersViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("fisp_farmers.details", mergeObjects(Router.currentRouteParams(), {fispFarmerId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("fispFarmersUpdate", this._id, values, function(err, res) {
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
						Meteor.call("fispFarmersRemove", me._id, function(err, res) {
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

Template.FispFarmersViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return FispFarmers.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return FispFarmers.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
