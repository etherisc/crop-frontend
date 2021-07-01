var pageSession = new ReactiveDict();

Template.AdminLogsBusinessTaskDetails.onCreated(function() {
	
});

Template.AdminLogsBusinessTaskDetails.onDestroyed(function() {
	
});

Template.AdminLogsBusinessTaskDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminLogsBusinessTaskDetails.events({
	
});

Template.AdminLogsBusinessTaskDetails.helpers({
	
});

Template.AdminLogsBusinessTaskDetailsForm.onCreated(function() {
	
});

Template.AdminLogsBusinessTaskDetailsForm.onDestroyed(function() {
	
});

Template.AdminLogsBusinessTaskDetailsForm.onRendered(function() {
	

	pageSession.set("adminLogsBusinessTaskDetailsFormInfoMessage", "");
	pageSession.set("adminLogsBusinessTaskDetailsFormErrorMessage", "");

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

Template.AdminLogsBusinessTaskDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminLogsBusinessTaskDetailsFormInfoMessage", "");
		pageSession.set("adminLogsBusinessTaskDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminLogsBusinessTaskDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminLogsBusinessTaskDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminLogsBusinessTaskDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminLogsBusinessTaskDetailsFormErrorMessage", message);
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

		Router.go("admin.logs_business_task", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.logs_business_task", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AdminLogsBusinessTaskDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminLogsBusinessTaskDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminLogsBusinessTaskDetailsFormErrorMessage");
	}
	
});
