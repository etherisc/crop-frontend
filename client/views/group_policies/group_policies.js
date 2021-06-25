Template.GroupPolicies.onCreated(function() {
	
});

Template.GroupPolicies.onDestroyed(function() {
	
});

Template.GroupPolicies.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.GroupPolicies.events({
	
});

Template.GroupPolicies.helpers({
	
});

Template.GroupPoliciesGpAggregates.created = function() {

};

Template.GroupPoliciesGpAggregates.destroyed = function() {

};

Template.GroupPoliciesGpAggregates.rendered = function() {

	const filter = this.data.group_policy_list_paged.matcher._selector;

	const aggregate = Meteor.call("gp_aggregates", filter, (err, res) => {

		if (res) { Session.set('aggregates', res); }
		
	});

};

Template.GroupPoliciesGpAggregates.helpers({
	"aggregates": () => {
		return Session.get('aggregates');
	}
});

Template.GroupPoliciesGpAggregates.events({

});


var GroupPoliciesViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("GroupPolicyListPagedSearchString") || "",
		searchFields: Session.get("GroupPolicyListPagedSearchFields") || ["id", "location.name", "sow_window", "sow_date", "begin_date", "end_date", "crop_stages", "payout", "meta"],
		sortBy: Session.get("GroupPolicyListPagedSortBy") || "",
		sortAscending: Session.get("GroupPolicyListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("groupPolicyListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.GroupPoliciesView.onCreated(function() {
	
});

Template.GroupPoliciesView.onDestroyed(function() {
	
});

Template.GroupPoliciesView.onRendered(function() {
	Session.set("GroupPoliciesViewStyle", "table");
	
});

Template.GroupPoliciesView.events({
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
				Session.set("GroupPolicyListPagedSearchString", searchString);
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
					Session.set("GroupPolicyListPagedSearchString", searchString);
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
					Session.set("GroupPolicyListPagedSearchString", "");
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
		GroupPoliciesViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		GroupPoliciesViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		GroupPoliciesViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		GroupPoliciesViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("GroupPolicyListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("GroupPolicyListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("GroupPolicyListPagedPageNo") || 0;
		if(currentPage < this.group_policy_list_paged_page_count - 1) {
			Session.set("GroupPolicyListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.GroupPoliciesView.helpers({

	"insertButtonClass": function() {
		return GroupPolicies.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.group_policy_list_paged || this.group_policy_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.group_policy_list_paged && this.group_policy_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.group_policy_list_paged && this.group_policy_list_paged.count() == 0 && Session.get("GroupPolicyListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("GroupPolicyListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("GroupPolicyListPagedPageNo") || 0) < this.group_policy_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("GroupPolicyListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("GroupPoliciesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("GroupPoliciesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("GroupPoliciesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("GroupPoliciesViewStyle") == "gallery";
	}

	
});


Template.GroupPoliciesViewTable.onCreated(function() {
	
});

Template.GroupPoliciesViewTable.onDestroyed(function() {
	
});

Template.GroupPoliciesViewTable.onRendered(function() {
	
});

Template.GroupPoliciesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("GroupPolicyListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("GroupPolicyListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("GroupPolicyListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("GroupPolicyListPagedSortAscending", !sortAscending);
		} else {
			Session.set("GroupPolicyListPagedSortAscending", true);
		}
	}
});

Template.GroupPoliciesViewTable.helpers({
});


Template.GroupPoliciesViewTableItems.onCreated(function() {
	
});

Template.GroupPoliciesViewTableItems.onDestroyed(function() {
	
});

Template.GroupPoliciesViewTableItems.onRendered(function() {
	
});

Template.GroupPoliciesViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("group_policies.details", mergeObjects(Router.currentRouteParams(), {groupPolicyId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("groupPoliciesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("groupPoliciesRemove", me._id, function(err, res) {
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

Template.GroupPoliciesViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return GroupPolicies.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return GroupPolicies.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.GroupPoliciesViewCustomActions.created = function() {

};

Template.GroupPoliciesViewCustomActions.destroyed = function() {

};

Template.GroupPoliciesViewCustomActions.rendered = function() {

};

Template.GroupPoliciesViewCustomActions.helpers({

});

Template.GroupPoliciesViewCustomActions.events({
	"click #btn-payout": function (e,t) {
		e.preventDefault();

		alert('The selected policies have been paid out.');
		Meteor.call('clear_selected');
	},
	"click #btn-clear": function (e,t) {
		e.preventDefault();

		Meteor.call('clear_selected');
	}
});
