Template.AdminDirectPayouts.onCreated(function() {
	
});

Template.AdminDirectPayouts.onDestroyed(function() {
	
});

Template.AdminDirectPayouts.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminDirectPayouts.events({
	
});

Template.AdminDirectPayouts.helpers({
	
});


var AdminDirectPayoutsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("DirectPayoutListPagedSearchString") || "",
		searchFields: Session.get("DirectPayoutListPagedSearchFields") || ["mobile_num", "amount", "status", "prefix", "msg"],
		sortBy: Session.get("DirectPayoutListPagedSortBy") || "",
		sortAscending: Session.get("DirectPayoutListPagedSortAscending") || true
	};

	var exportFields = ["mobile_num", "amount", "status", "prefix", "msg"];

	

	Meteor.call("directPayoutListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminDirectPayoutsView.onCreated(function() {
	
});

Template.AdminDirectPayoutsView.onDestroyed(function() {
	
});

Template.AdminDirectPayoutsView.onRendered(function() {
	Session.set("AdminDirectPayoutsViewStyle", "table");
	
});

Template.AdminDirectPayoutsView.events({
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
				Session.set("DirectPayoutListPagedSearchString", searchString);
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
					Session.set("DirectPayoutListPagedSearchString", searchString);
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
					Session.set("DirectPayoutListPagedSearchString", "");
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
		AdminDirectPayoutsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminDirectPayoutsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminDirectPayoutsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminDirectPayoutsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("DirectPayoutListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("DirectPayoutListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("DirectPayoutListPagedPageNo") || 0;
		if(currentPage < this.direct_payout_list_paged_page_count - 1) {
			Session.set("DirectPayoutListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminDirectPayoutsView.helpers({

	"insertButtonClass": function() {
		return DirectPayouts.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.direct_payout_list_paged || this.direct_payout_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.direct_payout_list_paged && this.direct_payout_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.direct_payout_list_paged && this.direct_payout_list_paged.count() == 0 && Session.get("DirectPayoutListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("DirectPayoutListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("DirectPayoutListPagedPageNo") || 0) < this.direct_payout_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("DirectPayoutListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminDirectPayoutsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminDirectPayoutsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminDirectPayoutsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminDirectPayoutsViewStyle") == "gallery";
	}

	
});


Template.AdminDirectPayoutsViewTable.onCreated(function() {
	
});

Template.AdminDirectPayoutsViewTable.onDestroyed(function() {
	
});

Template.AdminDirectPayoutsViewTable.onRendered(function() {
	
});

Template.AdminDirectPayoutsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("DirectPayoutListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("DirectPayoutListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("DirectPayoutListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("DirectPayoutListPagedSortAscending", !sortAscending);
		} else {
			Session.set("DirectPayoutListPagedSortAscending", true);
		}
	}
});

Template.AdminDirectPayoutsViewTable.helpers({
});


Template.AdminDirectPayoutsViewTableItems.onCreated(function() {
	
});

Template.AdminDirectPayoutsViewTableItems.onDestroyed(function() {
	
});

Template.AdminDirectPayoutsViewTableItems.onRendered(function() {
	
});

Template.AdminDirectPayoutsViewTableItems.events({
	

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

		Meteor.call("directPayoutsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("directPayoutsRemove", me._id, function(err, res) {
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

Template.AdminDirectPayoutsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return DirectPayouts.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return DirectPayouts.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.AdminDirectPayoutsViewCustomActions.created = function() {

};

Template.AdminDirectPayoutsViewCustomActions.destroyed = function() {

};

Template.AdminDirectPayoutsViewCustomActions.rendered = function() {

};

Template.AdminDirectPayoutsViewCustomActions.helpers({

});

Template.AdminDirectPayoutsViewCustomActions.events({

});
