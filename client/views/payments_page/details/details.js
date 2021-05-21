var pageSession = new ReactiveDict();

Template.PaymentsPageDetails.onCreated(function() {
	
});

Template.PaymentsPageDetails.onDestroyed(function() {
	
});

Template.PaymentsPageDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PaymentsPageDetails.events({
	
});

Template.PaymentsPageDetails.helpers({
	
});

Template.PaymentsPageDetailsForm.onCreated(function() {
	
});

Template.PaymentsPageDetailsForm.onDestroyed(function() {
	
});

Template.PaymentsPageDetailsForm.onRendered(function() {
	

	pageSession.set("paymentsPageDetailsFormInfoMessage", "");
	pageSession.set("paymentsPageDetailsFormErrorMessage", "");

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

Template.PaymentsPageDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("paymentsPageDetailsFormInfoMessage", "");
		pageSession.set("paymentsPageDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var paymentsPageDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(paymentsPageDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("paymentsPageDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("paymentsPageDetailsFormErrorMessage", message);
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

		Router.go("payments_page", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("payments_page", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PaymentsPageDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("paymentsPageDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("paymentsPageDetailsFormErrorMessage");
	}
	
});
