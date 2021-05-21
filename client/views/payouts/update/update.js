var pageSession = new ReactiveDict();

Template.PayoutsUpdate.onCreated(function() {
	
});

Template.PayoutsUpdate.onDestroyed(function() {
	
});

Template.PayoutsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PayoutsUpdate.events({
	
});

Template.PayoutsUpdate.helpers({
	
});

Template.PayoutsUpdateForm.onCreated(function() {
	
});

Template.PayoutsUpdateForm.onDestroyed(function() {
	
});

Template.PayoutsUpdateForm.onRendered(function() {
	

	pageSession.set("payoutsUpdateFormInfoMessage", "");
	pageSession.set("payoutsUpdateFormErrorMessage", "");

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

Template.PayoutsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("payoutsUpdateFormInfoMessage", "");
		pageSession.set("payoutsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var payoutsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(payoutsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("payoutsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("payouts", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("payoutsUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("payoutsUpdate", t.data.payout._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("payouts", mergeObjects(Router.currentRouteParams(), {}));
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

Template.PayoutsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("payoutsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("payoutsUpdateFormErrorMessage");
	}
	
});
