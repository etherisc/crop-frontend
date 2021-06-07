var pageSession = new ReactiveDict();

Template.PoliciesPagePartnerPoliciesDetails.onCreated(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetails.onDestroyed(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPagePartnerPoliciesDetails.events({
	
});

Template.PoliciesPagePartnerPoliciesDetails.helpers({
	
});

Template.PoliciesPagePartnerPoliciesDetailsForm.onCreated(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsForm.onDestroyed(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsForm.onRendered(function() {
	

	pageSession.set("policiesPagePartnerPoliciesDetailsFormInfoMessage", "");
	pageSession.set("policiesPagePartnerPoliciesDetailsFormErrorMessage", "");

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

Template.PoliciesPagePartnerPoliciesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("policiesPagePartnerPoliciesDetailsFormInfoMessage", "");
		pageSession.set("policiesPagePartnerPoliciesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var policiesPagePartnerPoliciesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(policiesPagePartnerPoliciesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("policiesPagePartnerPoliciesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("policiesPagePartnerPoliciesDetailsFormErrorMessage", message);
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

		Router.go("partners.details", mergeObjects(Router.currentRouteParams(), {partnerId: this.params.partnerId, mobile_num: this.params.mobile_num}));
	}

	
});

Template.PoliciesPagePartnerPoliciesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("policiesPagePartnerPoliciesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("policiesPagePartnerPoliciesDetailsFormErrorMessage");
	}
	
});

Template.PoliciesPagePartnerPoliciesDetailsCustomActions.created = function() {

};

Template.PoliciesPagePartnerPoliciesDetailsCustomActions.destroyed = function() {

};

Template.PoliciesPagePartnerPoliciesDetailsCustomActions.rendered = function() {

};

Template.PoliciesPagePartnerPoliciesDetailsCustomActions.helpers({
	"IsSigned": function() {
		return (this.policy.is_signed);
	},
});

Template.PoliciesPagePartnerPoliciesDetailsCustomActions.events({
	"click #btn-notarize": function (e,t) {
		e.preventDefault();

		bootbox.dialog({
			title: 'Calculate payouts',
			message: "<table><tr><th>Type</th><th>Payout</th></tr> <tr><td>GermDry</td><td>&nbsp;100.00</td></tr><tr><td>GermWet</td><td>&nbsp;50.00</td></tr></table>",
			buttons: {
				cancel: {
					label: "Close",
					className: "btn btn-light"
				}
			}
		});
	}

});


var PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("FilteredPaymentsListPagedSearchString") || "",
		searchFields: Session.get("FilteredPaymentsListPagedSearchFields") || ["mobile_num", "call_time", "mpesa_code", "mpesa_name", "order_number", "amount_paid"],
		sortBy: Session.get("FilteredPaymentsListPagedSortBy") || "",
		sortAscending: Session.get("FilteredPaymentsListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("filteredPaymentsListPagedExport", this.params.mobile_num, extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsView.onCreated(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsView.onDestroyed(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsView.onRendered(function() {
	Session.set("PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewStyle", "table");
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsView.events({
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
				Session.set("FilteredPaymentsListPagedSearchString", searchString);
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
					Session.set("FilteredPaymentsListPagedSearchString", searchString);
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
					Session.set("FilteredPaymentsListPagedSearchString", "");
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
		PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("FilteredPaymentsListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("FilteredPaymentsListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("FilteredPaymentsListPagedPageNo") || 0;
		if(currentPage < this.filtered_payments_list_paged_page_count - 1) {
			Session.set("FilteredPaymentsListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsView.helpers({

	"insertButtonClass": function() {
		return Payments.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.filtered_payments_list_paged || this.filtered_payments_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.filtered_payments_list_paged && this.filtered_payments_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.filtered_payments_list_paged && this.filtered_payments_list_paged.count() == 0 && Session.get("FilteredPaymentsListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("FilteredPaymentsListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("FilteredPaymentsListPagedPageNo") || 0) < this.filtered_payments_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("FilteredPaymentsListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewStyle") == "gallery";
	}

	
});


Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewTable.onCreated(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewTable.onDestroyed(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewTable.onRendered(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("FilteredPaymentsListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("FilteredPaymentsListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("FilteredPaymentsListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("FilteredPaymentsListPagedSortAscending", !sortAscending);
		} else {
			Session.set("FilteredPaymentsListPagedSortAscending", true);
		}
	}
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewTable.helpers({
});


Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewTableItems.onCreated(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewTableItems.onDestroyed(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewTableItems.onRendered(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewTableItems.events({
	

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

		Meteor.call("paymentsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("paymentsRemove", me._id, function(err, res) {
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

Template.PoliciesPagePartnerPoliciesDetailsPolicyPaymentsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Payments.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Payments.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});


var PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("FilteredActivationsListPagedSearchString") || "",
		searchFields: Session.get("FilteredActivationsListPagedSearchFields") || ["mobile_num", "call_time", "latitude", "longitude", "order_number", "activation_code", "value_chain", "amount_premium", "pixel", "county", "ward"],
		sortBy: Session.get("FilteredActivationsListPagedSortBy") || "",
		sortAscending: Session.get("FilteredActivationsListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("filteredActivationsListPagedExport", this.params.mobile_num, extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsView.onCreated(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsView.onDestroyed(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsView.onRendered(function() {
	Session.set("PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewStyle", "table");
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsView.events({
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
				Session.set("FilteredActivationsListPagedSearchString", searchString);
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
					Session.set("FilteredActivationsListPagedSearchString", searchString);
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
					Session.set("FilteredActivationsListPagedSearchString", "");
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
		PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("FilteredActivationsListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("FilteredActivationsListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("FilteredActivationsListPagedPageNo") || 0;
		if(currentPage < this.filtered_activations_list_paged_page_count - 1) {
			Session.set("FilteredActivationsListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsView.helpers({

	"insertButtonClass": function() {
		return Activations.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.filtered_activations_list_paged || this.filtered_activations_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.filtered_activations_list_paged && this.filtered_activations_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.filtered_activations_list_paged && this.filtered_activations_list_paged.count() == 0 && Session.get("FilteredActivationsListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("FilteredActivationsListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("FilteredActivationsListPagedPageNo") || 0) < this.filtered_activations_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("FilteredActivationsListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewStyle") == "gallery";
	}

	
});


Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewTable.onCreated(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewTable.onDestroyed(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewTable.onRendered(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("FilteredActivationsListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("FilteredActivationsListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("FilteredActivationsListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("FilteredActivationsListPagedSortAscending", !sortAscending);
		} else {
			Session.set("FilteredActivationsListPagedSortAscending", true);
		}
	}
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewTable.helpers({
});


Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewTableItems.onCreated(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewTableItems.onDestroyed(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewTableItems.onRendered(function() {
	
});

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewTableItems.events({
	

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

		Meteor.call("activationsUpdate", this._id, values, function(err, res) {
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
						Meteor.call("activationsRemove", me._id, function(err, res) {
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

Template.PoliciesPagePartnerPoliciesDetailsPolicyActivationsViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Activations.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Activations.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
