var pageSession = new ReactiveDict();

Template.PayoutsDemoDetails.onCreated(function() {
	
});

Template.PayoutsDemoDetails.onDestroyed(function() {
	
});

Template.PayoutsDemoDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PayoutsDemoDetails.events({
	
});

Template.PayoutsDemoDetails.helpers({
	
});

Template.PayoutsDemoDetailsForm.onCreated(function() {
	
});

Template.PayoutsDemoDetailsForm.onDestroyed(function() {
	
});

Template.PayoutsDemoDetailsForm.onRendered(function() {
	

	pageSession.set("payoutsDemoDetailsFormInfoMessage", "");
	pageSession.set("payoutsDemoDetailsFormErrorMessage", "");

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

Template.PayoutsDemoDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("payoutsDemoDetailsFormInfoMessage", "");
		pageSession.set("payoutsDemoDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var payoutsDemoDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(payoutsDemoDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("payoutsDemoDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("payoutsDemoDetailsFormErrorMessage", message);
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

		Router.go("payouts_demo", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("payouts_demo", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PayoutsDemoDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("payoutsDemoDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("payoutsDemoDetailsFormErrorMessage");
	}
	
});
