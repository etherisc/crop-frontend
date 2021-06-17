var pageSession = new ReactiveDict();

Template.AdminPayoutSchedulesDetailsDetails.onCreated(function() {
	
});

Template.AdminPayoutSchedulesDetailsDetails.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesDetailsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminPayoutSchedulesDetailsDetails.events({
	
});

Template.AdminPayoutSchedulesDetailsDetails.helpers({
	
});

Template.AdminPayoutSchedulesDetailsDetailsForm.onCreated(function() {
	
});

Template.AdminPayoutSchedulesDetailsDetailsForm.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("adminPayoutSchedulesDetailsDetailsFormInfoMessage", "");
	pageSession.set("adminPayoutSchedulesDetailsDetailsFormErrorMessage", "");

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

Template.AdminPayoutSchedulesDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminPayoutSchedulesDetailsDetailsFormInfoMessage", "");
		pageSession.set("adminPayoutSchedulesDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminPayoutSchedulesDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminPayoutSchedulesDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminPayoutSchedulesDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminPayoutSchedulesDetailsDetailsFormErrorMessage", message);
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

		Router.go("admin.payout_schedules.details", mergeObjects(Router.currentRouteParams(), {payoutScheduleId: this.params.payoutScheduleId}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.payout_schedules.details", mergeObjects(Router.currentRouteParams(), {payoutScheduleId: this.params.payoutScheduleId}));
	}

	
});

Template.AdminPayoutSchedulesDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminPayoutSchedulesDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminPayoutSchedulesDetailsDetailsFormErrorMessage");
	}
	
});
