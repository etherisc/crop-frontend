var pageSession = new ReactiveDict();

Template.AdminJobsDetails.onCreated(function() {
	
});

Template.AdminJobsDetails.onDestroyed(function() {
	
});

Template.AdminJobsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminJobsDetails.events({
	
});

Template.AdminJobsDetails.helpers({
	
});

Template.AdminJobsDetailsForm.onCreated(function() {
	
});

Template.AdminJobsDetailsForm.onDestroyed(function() {
	
});

Template.AdminJobsDetailsForm.onRendered(function() {
	

	pageSession.set("adminJobsDetailsFormInfoMessage", "");
	pageSession.set("adminJobsDetailsFormErrorMessage", "");

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

Template.AdminJobsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminJobsDetailsFormInfoMessage", "");
		pageSession.set("adminJobsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminJobsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminJobsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminJobsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminJobsDetailsFormErrorMessage", message);
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

		Router.go("admin.jobs", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.jobs", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AdminJobsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminJobsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminJobsDetailsFormErrorMessage");
	}
	
});
