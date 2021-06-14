var pageSession = new ReactiveDict();

Template.AdminNotificationsDetails.onCreated(function() {
	
});

Template.AdminNotificationsDetails.onDestroyed(function() {
	
});

Template.AdminNotificationsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminNotificationsDetails.events({
	
});

Template.AdminNotificationsDetails.helpers({
	
});

Template.AdminNotificationsDetailsForm.onCreated(function() {
	
});

Template.AdminNotificationsDetailsForm.onDestroyed(function() {
	
});

Template.AdminNotificationsDetailsForm.onRendered(function() {
	

	pageSession.set("adminNotificationsDetailsFormInfoMessage", "");
	pageSession.set("adminNotificationsDetailsFormErrorMessage", "");

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

Template.AdminNotificationsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminNotificationsDetailsFormInfoMessage", "");
		pageSession.set("adminNotificationsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminNotificationsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminNotificationsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminNotificationsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminNotificationsDetailsFormErrorMessage", message);
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

		Router.go("admin.notifications", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.notifications", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AdminNotificationsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminNotificationsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminNotificationsDetailsFormErrorMessage");
	}
	
});
