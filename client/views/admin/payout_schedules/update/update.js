var pageSession = new ReactiveDict();

Template.AdminPayoutSchedulesUpdate.onCreated(function() {
	
});

Template.AdminPayoutSchedulesUpdate.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminPayoutSchedulesUpdate.events({
	
});

Template.AdminPayoutSchedulesUpdate.helpers({
	
});

Template.AdminPayoutSchedulesUpdateForm.onCreated(function() {
	
});

Template.AdminPayoutSchedulesUpdateForm.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesUpdateForm.onRendered(function() {
	

	pageSession.set("adminPayoutSchedulesUpdateFormInfoMessage", "");
	pageSession.set("adminPayoutSchedulesUpdateFormErrorMessage", "");

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

Template.AdminPayoutSchedulesUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminPayoutSchedulesUpdateFormInfoMessage", "");
		pageSession.set("adminPayoutSchedulesUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminPayoutSchedulesUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminPayoutSchedulesUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminPayoutSchedulesUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.payout_schedules", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminPayoutSchedulesUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("payoutSchedulesUpdate", t.data.payout_schedule._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.payout_schedules", mergeObjects(Router.currentRouteParams(), {}));
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

Template.AdminPayoutSchedulesUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminPayoutSchedulesUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminPayoutSchedulesUpdateFormErrorMessage");
	}
	
});
