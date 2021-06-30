Template.PoliciesPage.onCreated(function() {
	
});

Template.PoliciesPage.onDestroyed(function() {
	
});

Template.PoliciesPage.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPage.events({
	
});

Template.PoliciesPage.helpers({
	
});


var PoliciesPageViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("PolicyList1PagedSearchString") || "",
		searchFields: Session.get("PolicyList1PagedSearchFields") || ["id", "gp_id", "group_policy_id", "phone_no", "premium_amount", "sum_insured_amount", "activation", "payments", "payout", "meta"],
		sortBy: Session.get("PolicyList1PagedSortBy") || "",
		sortAscending: Session.get("PolicyList1PagedSortAscending") || true
	};

	var exportFields = ["id", "gp_id", "group_policy_id", "phone_no", "premium_amount", "sum_insured_amount", "activation", "payments", "payout", "meta"];

	

	Meteor.call("policyList1PagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.PoliciesPageView.onCreated(function() {
	
});

Template.PoliciesPageView.onDestroyed(function() {
	
});

Template.PoliciesPageView.onRendered(function() {
	Session.set("PoliciesPageViewStyle", "table");
	
});

Template.PoliciesPageView.events({
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
				Session.set("PolicyList1PagedSearchString", searchString);
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
					Session.set("PolicyList1PagedSearchString", searchString);
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
					Session.set("PolicyList1PagedSearchString", "");
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
		PoliciesPageViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PoliciesPageViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PoliciesPageViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PoliciesPageViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("PolicyList1PagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("PolicyList1PagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("PolicyList1PagedPageNo") || 0;
		if(currentPage < this.policy_list1paged_page_count - 1) {
			Session.set("PolicyList1PagedPageNo", currentPage + 1);
		}
	}

	
});

Template.PoliciesPageView.helpers({

	"insertButtonClass": function() {
		return Policies.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.policy_list1_paged || this.policy_list1_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.policy_list1_paged && this.policy_list1_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.policy_list1_paged && this.policy_list1_paged.count() == 0 && Session.get("PolicyList1PagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("PolicyList1PagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("PolicyList1PagedPageNo") || 0) < this.policy_list1paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("PolicyList1PagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("PoliciesPageViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("PoliciesPageViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("PoliciesPageViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("PoliciesPageViewStyle") == "gallery";
	}

	
});


Template.PoliciesPageViewTable.onCreated(function() {
	
});

Template.PoliciesPageViewTable.onDestroyed(function() {
	
});

Template.PoliciesPageViewTable.onRendered(function() {
	
});

Template.PoliciesPageViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("PolicyList1PagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("PolicyList1PagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("PolicyList1PagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("PolicyList1PagedSortAscending", !sortAscending);
		} else {
			Session.set("PolicyList1PagedSortAscending", true);
		}
	}
});

Template.PoliciesPageViewTable.helpers({
});


Template.PoliciesPageViewTableItems.onCreated(function() {
	
});

Template.PoliciesPageViewTableItems.onDestroyed(function() {
	
});

Template.PoliciesPageViewTableItems.onRendered(function() {
	
});

Template.PoliciesPageViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("policies_page.details", mergeObjects(Router.currentRouteParams(), {policyId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("policiesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("policiesRemove", me._id, function(err, res) {
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

Template.PoliciesPageViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Policies.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Policies.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
