var pageSession = new ReactiveDict();

Template.FispFarmersDetails.onCreated(function() {
	
});

Template.FispFarmersDetails.onDestroyed(function() {
	
});

Template.FispFarmersDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.FispFarmersDetails.events({
	
});

Template.FispFarmersDetails.helpers({
	
});

Template.FispFarmersDetailsForm.onCreated(function() {
	
});

Template.FispFarmersDetailsForm.onDestroyed(function() {
	
});

Template.FispFarmersDetailsForm.onRendered(function() {
	

	pageSession.set("fispFarmersDetailsFormInfoMessage", "");
	pageSession.set("fispFarmersDetailsFormErrorMessage", "");

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

Template.FispFarmersDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("fispFarmersDetailsFormInfoMessage", "");
		pageSession.set("fispFarmersDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var fispFarmersDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(fispFarmersDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("fispFarmersDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("fispFarmersDetailsFormErrorMessage", message);
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

		Router.go("fisp_farmers", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("fisp_farmers", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.FispFarmersDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("fispFarmersDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("fispFarmersDetailsFormErrorMessage");
	}
	
});
