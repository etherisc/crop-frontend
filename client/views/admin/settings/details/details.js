var pageSession = new ReactiveDict();

Template.AdminSettingsDetails.onCreated(function() {
	
});

Template.AdminSettingsDetails.onDestroyed(function() {
	
});

Template.AdminSettingsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminSettingsDetails.events({
	
});

Template.AdminSettingsDetails.helpers({
	
});

Template.AdminSettingsDetailsForm.onCreated(function() {
	
});

Template.AdminSettingsDetailsForm.onDestroyed(function() {
	
});

Template.AdminSettingsDetailsForm.onRendered(function() {
	

	pageSession.set("adminSettingsDetailsFormInfoMessage", "");
	pageSession.set("adminSettingsDetailsFormErrorMessage", "");

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

Template.AdminSettingsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminSettingsDetailsFormInfoMessage", "");
		pageSession.set("adminSettingsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminSettingsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminSettingsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminSettingsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminSettingsDetailsFormErrorMessage", message);
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

		Router.go("admin.settings", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.settings", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AdminSettingsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminSettingsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminSettingsDetailsFormErrorMessage");
	}
	
});
