var pageSession = new ReactiveDict();

Template.AdminPayoutSchedulesDetailsUpdate.onCreated(function() {
	
});

Template.AdminPayoutSchedulesDetailsUpdate.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesDetailsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminPayoutSchedulesDetailsUpdate.events({
	
});

Template.AdminPayoutSchedulesDetailsUpdate.helpers({
	
});

Template.AdminPayoutSchedulesDetailsUpdateForm.onCreated(function() {
	
});

Template.AdminPayoutSchedulesDetailsUpdateForm.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesDetailsUpdateForm.onRendered(function() {
	

	pageSession.set("adminPayoutSchedulesDetailsUpdateFormInfoMessage", "");
	pageSession.set("adminPayoutSchedulesDetailsUpdateFormErrorMessage", "");

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

Template.AdminPayoutSchedulesDetailsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminPayoutSchedulesDetailsUpdateFormInfoMessage", "");
		pageSession.set("adminPayoutSchedulesDetailsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminPayoutSchedulesDetailsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminPayoutSchedulesDetailsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminPayoutSchedulesDetailsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.payout_schedules.details", mergeObjects(Router.currentRouteParams(), {payoutScheduleId: self.params.payoutScheduleId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminPayoutSchedulesDetailsUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("iPoliciesUpdate", t.data.i_policy1._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.payout_schedules.details", mergeObjects(Router.currentRouteParams(), {payoutScheduleId: this.params.payoutScheduleId}));
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

Template.AdminPayoutSchedulesDetailsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminPayoutSchedulesDetailsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminPayoutSchedulesDetailsUpdateFormErrorMessage");
	}
	
});
