var pageSession = new ReactiveDict();

Template.GroupPoliciesDetails.onCreated(function() {
	
});

Template.GroupPoliciesDetails.onDestroyed(function() {
	
});

Template.GroupPoliciesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.GroupPoliciesDetails.events({
	
});

Template.GroupPoliciesDetails.helpers({
	
});

Template.GroupPoliciesDetailsForm.onCreated(function() {
	
});

Template.GroupPoliciesDetailsForm.onDestroyed(function() {
	
});

Template.GroupPoliciesDetailsForm.onRendered(function() {
	

	pageSession.set("groupPoliciesDetailsFormInfoMessage", "");
	pageSession.set("groupPoliciesDetailsFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.GroupPoliciesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("groupPoliciesDetailsFormInfoMessage", "");
		pageSession.set("groupPoliciesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var groupPoliciesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(groupPoliciesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("groupPoliciesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("groupPoliciesDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("group_policies", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.GroupPoliciesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("groupPoliciesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("groupPoliciesDetailsFormErrorMessage");
	}
	
});


var GroupPoliciesDetailsGpIndividualPoliciesExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("GpIndividualPoliciesPagedSearchString") || "",
		searchFields: Session.get("GpIndividualPoliciesPagedSearchFields") || [],
		sortBy: Session.get("GpIndividualPoliciesPagedSortBy") || "",
		sortAscending: Session.get("GpIndividualPoliciesPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("gpIndividualPoliciesPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.GroupPoliciesDetailsGpIndividualPolicies.onCreated(function() {
	
});

Template.GroupPoliciesDetailsGpIndividualPolicies.onDestroyed(function() {
	
});

Template.GroupPoliciesDetailsGpIndividualPolicies.onRendered(function() {
	Session.set("GroupPoliciesDetailsGpIndividualPoliciesStyle", "table");
	
});

Template.GroupPoliciesDetailsGpIndividualPolicies.events({
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
				Session.set("GpIndividualPoliciesPagedSearchString", searchString);
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
					Session.set("GpIndividualPoliciesPagedSearchString", searchString);
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
					Session.set("GpIndividualPoliciesPagedSearchString", "");
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
		GroupPoliciesDetailsGpIndividualPoliciesExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		GroupPoliciesDetailsGpIndividualPoliciesExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		GroupPoliciesDetailsGpIndividualPoliciesExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		GroupPoliciesDetailsGpIndividualPoliciesExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("GpIndividualPoliciesPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("GpIndividualPoliciesPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("GpIndividualPoliciesPagedPageNo") || 0;
		if(currentPage < this.gp_individual_policies_paged_page_count - 1) {
			Session.set("GpIndividualPoliciesPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.GroupPoliciesDetailsGpIndividualPolicies.helpers({

	"insertButtonClass": function() {
		return Policies.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.gp_individual_policies_paged || this.gp_individual_policies_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.gp_individual_policies_paged && this.gp_individual_policies_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.gp_individual_policies_paged && this.gp_individual_policies_paged.count() == 0 && Session.get("GpIndividualPoliciesPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("GpIndividualPoliciesPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("GpIndividualPoliciesPagedPageNo") || 0) < this.gp_individual_policies_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("GpIndividualPoliciesPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("GroupPoliciesDetailsGpIndividualPoliciesStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("GroupPoliciesDetailsGpIndividualPoliciesStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("GroupPoliciesDetailsGpIndividualPoliciesStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("GroupPoliciesDetailsGpIndividualPoliciesStyle") == "gallery";
	}

	
});


Template.GroupPoliciesDetailsGpIndividualPoliciesTable.onCreated(function() {
	
});

Template.GroupPoliciesDetailsGpIndividualPoliciesTable.onDestroyed(function() {
	
});

Template.GroupPoliciesDetailsGpIndividualPoliciesTable.onRendered(function() {
	
});

Template.GroupPoliciesDetailsGpIndividualPoliciesTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("GpIndividualPoliciesPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("GpIndividualPoliciesPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("GpIndividualPoliciesPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("GpIndividualPoliciesPagedSortAscending", !sortAscending);
		} else {
			Session.set("GpIndividualPoliciesPagedSortAscending", true);
		}
	}
});

Template.GroupPoliciesDetailsGpIndividualPoliciesTable.helpers({
});


Template.GroupPoliciesDetailsGpIndividualPoliciesTableItems.onCreated(function() {
	
});

Template.GroupPoliciesDetailsGpIndividualPoliciesTableItems.onDestroyed(function() {
	
});

Template.GroupPoliciesDetailsGpIndividualPoliciesTableItems.onRendered(function() {
	
});

Template.GroupPoliciesDetailsGpIndividualPoliciesTableItems.events({
	

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

Template.GroupPoliciesDetailsGpIndividualPoliciesTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Policies.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Policies.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
