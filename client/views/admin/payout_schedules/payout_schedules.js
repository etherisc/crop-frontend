Template.AdminPayoutSchedules.onCreated(function() {
	
});

Template.AdminPayoutSchedules.onDestroyed(function() {
	
});

Template.AdminPayoutSchedules.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminPayoutSchedules.events({
	
});

Template.AdminPayoutSchedules.helpers({
	
});


var AdminPayoutSchedulesViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("PayoutScheduleListPagedSearchString") || "",
		searchFields: Session.get("PayoutScheduleListPagedSearchFields") || ["title", "filter", "status", "num_policies", "sum_premium", "sum_insured", "sum_payout", "createdAt", "modifiedAt", "audit_trail"],
		sortBy: Session.get("PayoutScheduleListPagedSortBy") || "",
		sortAscending: Session.get("PayoutScheduleListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("payoutScheduleListPagedExport", extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.AdminPayoutSchedulesView.onCreated(function() {
	
});

Template.AdminPayoutSchedulesView.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesView.onRendered(function() {
	Session.set("AdminPayoutSchedulesViewStyle", "table");
	
});

Template.AdminPayoutSchedulesView.events({
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
				Session.set("PayoutScheduleListPagedSearchString", searchString);
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
					Session.set("PayoutScheduleListPagedSearchString", searchString);
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
					Session.set("PayoutScheduleListPagedSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.payout_schedules.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AdminPayoutSchedulesViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AdminPayoutSchedulesViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AdminPayoutSchedulesViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AdminPayoutSchedulesViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("PayoutScheduleListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("PayoutScheduleListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("PayoutScheduleListPagedPageNo") || 0;
		if(currentPage < this.payout_schedule_list_paged_page_count - 1) {
			Session.set("PayoutScheduleListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.AdminPayoutSchedulesView.helpers({

	"insertButtonClass": function() {
		return PayoutSchedules.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.payout_schedule_list_paged || this.payout_schedule_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.payout_schedule_list_paged && this.payout_schedule_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.payout_schedule_list_paged && this.payout_schedule_list_paged.count() == 0 && Session.get("PayoutScheduleListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("PayoutScheduleListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("PayoutScheduleListPagedPageNo") || 0) < this.payout_schedule_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("PayoutScheduleListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("AdminPayoutSchedulesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("AdminPayoutSchedulesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("AdminPayoutSchedulesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("AdminPayoutSchedulesViewStyle") == "gallery";
	}

	
});


Template.AdminPayoutSchedulesViewTable.onCreated(function() {
	
});

Template.AdminPayoutSchedulesViewTable.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesViewTable.onRendered(function() {
	
});

Template.AdminPayoutSchedulesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("PayoutScheduleListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("PayoutScheduleListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("PayoutScheduleListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("PayoutScheduleListPagedSortAscending", !sortAscending);
		} else {
			Session.set("PayoutScheduleListPagedSortAscending", true);
		}
	}
});

Template.AdminPayoutSchedulesViewTable.helpers({
});


Template.AdminPayoutSchedulesViewTableItems.onCreated(function() {
	
});

Template.AdminPayoutSchedulesViewTableItems.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesViewTableItems.onRendered(function() {
	
});

Template.AdminPayoutSchedulesViewTableItems.events({
	"click [data-action='create']": function(e, t) {
e.preventDefault();

Meteor.call('changeStatusPayoutSchedule', this._id, function (err, res) {

	if (err) {
		toast_error(`Error: ${err.message}`);
	} else {
		toast_info(`Status changed: ${res}`);
	}

});

return false;

},

"click [data-action='approve_actuary']": function(e, t) {
e.preventDefault();

Meteor.call('changeStatusPayoutSchedule', this._id, function (err, res) {

	if (err) {
		toast_error(`Error: ${err.message}`);
	} else {
		toast_info(`Status changed: ${res}`);
	}

});

return false;

},

"click [data-action='approve_project_manager']": function(e, t) {
e.preventDefault();

Meteor.call('changeStatusPayoutSchedule', this._id, function (err, res) {

	if (err) {
		toast_error(`Error: ${err.message}`);
	} else {
		toast_info(`Status changed: ${res}`);
	}

});

return false;

},

"click [data-action='send_insurance']": function(e, t) {
e.preventDefault();

Meteor.call('changeStatusPayoutSchedule', this._id, function (err, res) {

	if (err) {
		toast_error(`Error: ${err.message}`);
	} else {
		toast_info(`Status changed: ${res}`);
	}

});

return false;

},

"click [data-action='approval_insurance']": function(e, t) {
e.preventDefault();

Meteor.call('changeStatusPayoutSchedule', this._id, function (err, res) {

	if (err) {
		toast_error(`Error: ${err.message}`);
	} else {
		toast_info(`Status changed: ${res}`);
	}

});

return false;

},

"click [data-action='confirm_payout']": function(e, t) {
e.preventDefault();

Meteor.call('changeStatusPayoutSchedule', this._id, function (err, res) {

	if (err) {
		toast_error(`Error: ${err.message}`);
	} else {
		toast_info(`Status changed: ${res}`);
	}

});

return false;

},



	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("admin.payout_schedules.details", mergeObjects(Router.currentRouteParams(), {payoutScheduleId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("payoutSchedulesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("payoutSchedulesRemove", me._id, function(err, res) {
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
		Router.go("admin.payout_schedules.update", mergeObjects(Router.currentRouteParams(), {payoutScheduleId: this._id}));
		return false;
	}
});

Template.AdminPayoutSchedulesViewTableItems.helpers({
	"isEnabledCreate": function() {
return !!(this.status === '0')
},
"isEnabledApproveActuary": function() {
return !!(this.status === '1')
},
"isEnabledApproveProjectManager": function() {
return !!(this.status === '2'
)
},
"isEnabledSendInsurance": function() {
return !!(this.status === '3')
},
"isEnabledApprovalInsurance": function() {
return !!(this.status === '4'
)
},
"isEnabledConfirmPayout": function() {
return !!(this.status === '5')
},


	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return PayoutSchedules.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return PayoutSchedules.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
