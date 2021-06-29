var pageSession = new ReactiveDict();

Template.AdminPayoutSchedulesDetails.onCreated(function() {
	
});

Template.AdminPayoutSchedulesDetails.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminPayoutSchedulesDetails.events({
	
});

Template.AdminPayoutSchedulesDetails.helpers({
	
});

Template.AdminPayoutSchedulesDetailsForm.onCreated(function() {
	
});

Template.AdminPayoutSchedulesDetailsForm.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesDetailsForm.onRendered(function() {
	

	pageSession.set("adminPayoutSchedulesDetailsFormInfoMessage", "");
	pageSession.set("adminPayoutSchedulesDetailsFormErrorMessage", "");

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

Template.AdminPayoutSchedulesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminPayoutSchedulesDetailsFormInfoMessage", "");
		pageSession.set("adminPayoutSchedulesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminPayoutSchedulesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminPayoutSchedulesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminPayoutSchedulesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminPayoutSchedulesDetailsFormErrorMessage", message);
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

		Router.go("admin.payout_schedules", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AdminPayoutSchedulesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminPayoutSchedulesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminPayoutSchedulesDetailsFormErrorMessage");
	}
	
});


var AdminPayoutSchedulesDetailsPayoutScheduleEntriesExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("PayoutScheduleEntriesListPagedSearchString") || "",
		searchFields: Session.get("PayoutScheduleEntriesListPagedSearchFields") || ["phone_no", "group_policy_id", "premium_amount", "sum_insured_amount", "payout.actual_amount", "payout.override_amount"],
		sortBy: Session.get("PayoutScheduleEntriesListPagedSortBy") || "",
		sortAscending: Session.get("PayoutScheduleEntriesListPagedSortAscending") || true
	};

	var exportFields = ["phone_no", "group_policy_id", "premium_amount", "sum_insured_amount", "payout.actual_amount", "payout.override_amount"];

	

	Meteor.call("payoutScheduleEntriesListPagedExport", this.params.payoutScheduleId, extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntries.onCreated(function() {
	
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntries.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntries.onRendered(function() {
	Session.set("AdminPayoutSchedulesDetailsPayoutScheduleEntriesStyle", "table");
	
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntries.events({
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
				Session.set("PayoutScheduleEntriesListPagedSearchString", searchString);
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
					Session.set("PayoutScheduleEntriesListPagedSearchString", searchString);
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
					Session.set("PayoutScheduleEntriesListPagedSearchString", "");
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
		AdminPayoutSchedulesDetailsPayoutScheduleEntriesExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminPayoutSchedulesDetailsPayoutScheduleEntriesExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminPayoutSchedulesDetailsPayoutScheduleEntriesExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminPayoutSchedulesDetailsPayoutScheduleEntriesExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("PayoutScheduleEntriesListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("PayoutScheduleEntriesListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("PayoutScheduleEntriesListPagedPageNo") || 0;
		if(currentPage < this.payout_schedule_entries_list_paged_page_count - 1) {
			Session.set("PayoutScheduleEntriesListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntries.helpers({

	"insertButtonClass": function() {
		return Policies.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.payout_schedule_entries_list_paged || this.payout_schedule_entries_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.payout_schedule_entries_list_paged && this.payout_schedule_entries_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.payout_schedule_entries_list_paged && this.payout_schedule_entries_list_paged.count() == 0 && Session.get("PayoutScheduleEntriesListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("PayoutScheduleEntriesListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("PayoutScheduleEntriesListPagedPageNo") || 0) < this.payout_schedule_entries_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("PayoutScheduleEntriesListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminPayoutSchedulesDetailsPayoutScheduleEntriesStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminPayoutSchedulesDetailsPayoutScheduleEntriesStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminPayoutSchedulesDetailsPayoutScheduleEntriesStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminPayoutSchedulesDetailsPayoutScheduleEntriesStyle") == "gallery";
	}

	
});


Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesTable.onCreated(function() {
	
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesTable.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesTable.onRendered(function() {
	
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("PayoutScheduleEntriesListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("PayoutScheduleEntriesListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("PayoutScheduleEntriesListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("PayoutScheduleEntriesListPagedSortAscending", !sortAscending);
		} else {
			Session.set("PayoutScheduleEntriesListPagedSortAscending", true);
		}
	}
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesTable.helpers({
});


Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesTableItems.onCreated(function() {
	
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesTableItems.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesTableItems.onRendered(function() {
	
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("admin.payout_schedules.details.details", mergeObjects(Router.currentRouteParams(), {policyId: this._id}));
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
		Router.go("admin.payout_schedules.details.update", mergeObjects(Router.currentRouteParams(), {policyId: this._id}));
		return false;
	}
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Policies.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Policies.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesCustomActions.created = function() {

};

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesCustomActions.destroyed = function() {

};

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesCustomActions.rendered = function() {

};

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesCustomActions.helpers({

});

Template.AdminPayoutSchedulesDetailsPayoutScheduleEntriesCustomActions.events({
	"change #chk-filter": function (e,t) {
		console.log(e, t);
		console.log($('#chk-filter').prop('checked'));
	}
});

