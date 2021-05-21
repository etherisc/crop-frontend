var pageSession = new ReactiveDict();

Template.PartnersDetails.onCreated(function() {
	
});

Template.PartnersDetails.onDestroyed(function() {
	
});

Template.PartnersDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PartnersDetails.events({
	
});

Template.PartnersDetails.helpers({
	
});

Template.PartnersDetailsForm.onCreated(function() {
	
});

Template.PartnersDetailsForm.onDestroyed(function() {
	
});

Template.PartnersDetailsForm.onRendered(function() {
	

	pageSession.set("partnersDetailsFormInfoMessage", "");
	pageSession.set("partnersDetailsFormErrorMessage", "");

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

Template.PartnersDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("partnersDetailsFormInfoMessage", "");
		pageSession.set("partnersDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var partnersDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(partnersDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("partnersDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("partnersDetailsFormErrorMessage", message);
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

		Router.go("partners", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PartnersDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("partnersDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("partnersDetailsFormErrorMessage");
	}
	
});


var PartnersDetailsPartnersPoliciesViewExport = function(fileType) {
	var extraParams = {
		searchText: Session.get("PartnerPoliciesListPagedSearchString") || "",
		searchFields: Session.get("PartnerPoliciesListPagedSearchFields") || ["id", "siteTable_id", "policyStatus_code", "startDate", "endDate", "order_number", "mobile_num", "is_signed"],
		sortBy: Session.get("PartnerPoliciesListPagedSortBy") || "",
		sortAscending: Session.get("PartnerPoliciesListPagedSortAscending") || true
	};

	var exportFields = [];

	

	Meteor.call("partnerPoliciesListPagedExport", this.params.mobile_num, extraParams, exportFields, fileType, function(e, data) {
		if(e) {
			alert(e);
			return;
		}

		let filename = "export." + fileType;
		downloadLocalResource(data, filename, "application/octet-stream");
	});
};

Template.PartnersDetailsPartnersPoliciesView.onCreated(function() {
	
});

Template.PartnersDetailsPartnersPoliciesView.onDestroyed(function() {
	
});

Template.PartnersDetailsPartnersPoliciesView.onRendered(function() {
	Session.set("PartnersDetailsPartnersPoliciesViewStyle", "table");
	
});

Template.PartnersDetailsPartnersPoliciesView.events({
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
				Session.set("PartnerPoliciesListPagedSearchString", searchString);
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
					Session.set("PartnerPoliciesListPagedSearchString", searchString);
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
					Session.set("PartnerPoliciesListPagedSearchString", "");
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
		PartnersDetailsPartnersPoliciesViewExport.call(this, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PartnersDetailsPartnersPoliciesViewExport.call(this, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PartnersDetailsPartnersPoliciesViewExport.call(this, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PartnersDetailsPartnersPoliciesViewExport.call(this, "json");
	},

	"click .prev-page-link": function(e, t) {
		e.preventDefault();
		var currentPage = Session.get("PartnerPoliciesListPagedPageNo") || 0;
		if(currentPage > 0) {
			Session.set("PartnerPoliciesListPagedPageNo", currentPage - 1);
		}
	},

	"click .next-page-link": function(e, t) {
		e.preventDefault();
		let currentPage = Session.get("PartnerPoliciesListPagedPageNo") || 0;
		if(currentPage < this.partner_policies_list_paged_page_count - 1) {
			Session.set("PartnerPoliciesListPagedPageNo", currentPage + 1);
		}
	}

	
});

Template.PartnersDetailsPartnersPoliciesView.helpers({

	"insertButtonClass": function() {
		return Policies.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.partner_policies_list_paged || this.partner_policies_list_paged.count() == 0;
	},
	"isNotEmpty": function() {
		return this.partner_policies_list_paged && this.partner_policies_list_paged.count() > 0;
	},
	"isNotFound": function() {
		return this.partner_policies_list_paged && this.partner_policies_list_paged.count() == 0 && Session.get("PartnerPoliciesListPagedSearchString");
	},
	"gotPrevPage": function() {
		return !!Session.get("PartnerPoliciesListPagedPageNo");
	},
	"gotNextPage": function() {
		return (Session.get("PartnerPoliciesListPagedPageNo") || 0) < this.partner_policies_list_paged_page_count - 1;
	},
	"searchString": function() {
		return Session.get("PartnerPoliciesListPagedSearchString");
	},
	"viewAsTable": function() {
		return Session.get("PartnersDetailsPartnersPoliciesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return Session.get("PartnersDetailsPartnersPoliciesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return Session.get("PartnersDetailsPartnersPoliciesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return Session.get("PartnersDetailsPartnersPoliciesViewStyle") == "gallery";
	}

	
});


Template.PartnersDetailsPartnersPoliciesViewTable.onCreated(function() {
	
});

Template.PartnersDetailsPartnersPoliciesViewTable.onDestroyed(function() {
	
});

Template.PartnersDetailsPartnersPoliciesViewTable.onRendered(function() {
	
});

Template.PartnersDetailsPartnersPoliciesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = Session.get("PartnerPoliciesListPagedSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		Session.set("PartnerPoliciesListPagedSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = Session.get("PartnerPoliciesListPagedSortAscending");
			if(typeof sortAscending == "undefined") {
				sortAscending = true;
			}
			Session.set("PartnerPoliciesListPagedSortAscending", !sortAscending);
		} else {
			Session.set("PartnerPoliciesListPagedSortAscending", true);
		}
	}
});

Template.PartnersDetailsPartnersPoliciesViewTable.helpers({
});


Template.PartnersDetailsPartnersPoliciesViewTableItems.onCreated(function() {
	
});

Template.PartnersDetailsPartnersPoliciesViewTableItems.onDestroyed(function() {
	
});

Template.PartnersDetailsPartnersPoliciesViewTableItems.onRendered(function() {
	
});

Template.PartnersDetailsPartnersPoliciesViewTableItems.events({
	"click [data-action='sign']": function(e, t) {
e.preventDefault();

notarize(
	"Policy",                                   // type
	this.id + ' ' + this.order_number ,         // message 
	this,                                       // payload
	"policiesUpdate"                            // updateMethod
);

return false;

},



	"click td": function(e, t) {
		e.preventDefault();
		var item = this;
		var itemId = item ? item._id : null;

		
		Router.go("policies_page.partner_policies_details", mergeObjects(Router.currentRouteParams(), {policyId: this._id, mobile_num: this.mobile_num, partnerId: Router.currentRouteParams().partnerId}));
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

Template.PartnersDetailsPartnersPoliciesViewTableItems.helpers({
	"isEnabledSign": function() {
return !!(!this.is_signed)
},


	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Policies.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Policies.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
