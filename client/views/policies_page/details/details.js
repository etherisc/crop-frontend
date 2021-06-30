var pageSession = new ReactiveDict();

Template.PoliciesPageDetails.onCreated(function() {
	
});

Template.PoliciesPageDetails.onDestroyed(function() {
	
});

Template.PoliciesPageDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPageDetails.events({
	
});

Template.PoliciesPageDetails.helpers({
	
});

Template.PoliciesPageDetailsForm.onCreated(function() {
	
});

Template.PoliciesPageDetailsForm.onDestroyed(function() {
	
});

Template.PoliciesPageDetailsForm.onRendered(function() {
	

	pageSession.set("policiesPageDetailsFormInfoMessage", "");
	pageSession.set("policiesPageDetailsFormErrorMessage", "");

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

Template.PoliciesPageDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("policiesPageDetailsFormInfoMessage", "");
		pageSession.set("policiesPageDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var policiesPageDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(policiesPageDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("policiesPageDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("policiesPageDetailsFormErrorMessage", message);
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

		Router.go("policies_page", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("policies_page", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PoliciesPageDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("policiesPageDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("policiesPageDetailsFormErrorMessage");
	}
	
});
