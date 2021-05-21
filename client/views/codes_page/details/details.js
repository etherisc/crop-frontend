var pageSession = new ReactiveDict();

Template.CodesPageDetails.onCreated(function() {
	
});

Template.CodesPageDetails.onDestroyed(function() {
	
});

Template.CodesPageDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CodesPageDetails.events({
	
});

Template.CodesPageDetails.helpers({
	
});

Template.CodesPageDetailsForm.onCreated(function() {
	
});

Template.CodesPageDetailsForm.onDestroyed(function() {
	
});

Template.CodesPageDetailsForm.onRendered(function() {
	

	pageSession.set("codesPageDetailsFormInfoMessage", "");
	pageSession.set("codesPageDetailsFormErrorMessage", "");

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

Template.CodesPageDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("codesPageDetailsFormInfoMessage", "");
		pageSession.set("codesPageDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var codesPageDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(codesPageDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("codesPageDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("codesPageDetailsFormErrorMessage", message);
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

		Router.go("codes_page", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("codes_page", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.CodesPageDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("codesPageDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("codesPageDetailsFormErrorMessage");
	}
	
});
