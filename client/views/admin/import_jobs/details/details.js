var pageSession = new ReactiveDict();

Template.AdminImportJobsDetails.onCreated(function() {
	
});

Template.AdminImportJobsDetails.onDestroyed(function() {
	
});

Template.AdminImportJobsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminImportJobsDetails.events({
	
});

Template.AdminImportJobsDetails.helpers({
	
});

Template.AdminImportJobsDetailsForm.onCreated(function() {
	
});

Template.AdminImportJobsDetailsForm.onDestroyed(function() {
	
});

Template.AdminImportJobsDetailsForm.onRendered(function() {
	

	pageSession.set("adminImportJobsDetailsFormInfoMessage", "");
	pageSession.set("adminImportJobsDetailsFormErrorMessage", "");

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

Template.AdminImportJobsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminImportJobsDetailsFormInfoMessage", "");
		pageSession.set("adminImportJobsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminImportJobsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminImportJobsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminImportJobsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminImportJobsDetailsFormErrorMessage", message);
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

		Router.go("admin.import_jobs", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.import_jobs", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AdminImportJobsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminImportJobsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminImportJobsDetailsFormErrorMessage");
	}
	
});
