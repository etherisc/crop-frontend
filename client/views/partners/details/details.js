var pageSession = new ReactiveDict();

Template.PartnersDetails.onCreated(function() {
	
});

Template.PartnersDetails.onDestroyed(function() {
	
});

Template.PartnersDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PartnersDetails.events({
	
});

Template.PartnersDetails.helpers({
	
});

Template.PartnersDetailsForm.onCreated(function() {
	
});

Template.PartnersDetailsForm.onDestroyed(function() {
	
});

Template.PartnersDetailsForm.onRendered(function() {
	

	pageSession.set("partnersDetailsFormInfoMessage", "");
	pageSession.set("partnersDetailsFormErrorMessage", "");

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

Template.PartnersDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("partnersDetailsFormInfoMessage", "");
		pageSession.set("partnersDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var partnersDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(partnersDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("partnersDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("partnersDetailsFormErrorMessage", message);
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

		Router.go("partners", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.PartnersDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("partnersDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("partnersDetailsFormErrorMessage");
	}
	
});

Template.PartnersDetailsSendSms.onCreated(function() {
	
});

Template.PartnersDetailsSendSms.onDestroyed(function() {
	
});

Template.PartnersDetailsSendSms.onRendered(function() {
	

	pageSession.set("partnersDetailsSendSmsInfoMessage", "");
	pageSession.set("partnersDetailsSendSmsErrorMessage", "");

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

Template.PartnersDetailsSendSms.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("partnersDetailsSendSmsInfoMessage", "");
		pageSession.set("partnersDetailsSendSmsErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var partnersDetailsSendSmsMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(partnersDetailsSendSmsMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("partnersDetailsSendSmsInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("partnersDetailsSendSmsErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				/* on submit */
console.log(t.data.partner.mobile_num);
toast_info(`Sending SMS to ${t.data.partner.mobile_num}`);
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

Template.PartnersDetailsSendSms.helpers({
	"infoMessage": function() {
		return pageSession.get("partnersDetailsSendSmsInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("partnersDetailsSendSmsErrorMessage");
	}
	
});
