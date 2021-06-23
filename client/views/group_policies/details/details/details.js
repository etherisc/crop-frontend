var pageSession = new ReactiveDict();

Template.GroupPoliciesDetailsDetails.onCreated(function() {
	
});

Template.GroupPoliciesDetailsDetails.onDestroyed(function() {
	
});

Template.GroupPoliciesDetailsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.GroupPoliciesDetailsDetails.events({
	
});

Template.GroupPoliciesDetailsDetails.helpers({
	
});

Template.GroupPoliciesDetailsDetailsForm.onCreated(function() {
	
});

Template.GroupPoliciesDetailsDetailsForm.onDestroyed(function() {
	
});

Template.GroupPoliciesDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("groupPoliciesDetailsDetailsFormInfoMessage", "");
	pageSession.set("groupPoliciesDetailsDetailsFormErrorMessage", "");

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

Template.GroupPoliciesDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("groupPoliciesDetailsDetailsFormInfoMessage", "");
		pageSession.set("groupPoliciesDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var groupPoliciesDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(groupPoliciesDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("groupPoliciesDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("groupPoliciesDetailsDetailsFormErrorMessage", message);
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

		/*BACK_REDIRECT*/
	}

	
});

Template.GroupPoliciesDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("groupPoliciesDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("groupPoliciesDetailsDetailsFormErrorMessage");
	}
	
});
