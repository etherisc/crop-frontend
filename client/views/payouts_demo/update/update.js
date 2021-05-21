var pageSession = new ReactiveDict();

Template.PayoutsDemoUpdate.onCreated(function() {
	
});

Template.PayoutsDemoUpdate.onDestroyed(function() {
	
});

Template.PayoutsDemoUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PayoutsDemoUpdate.events({
	
});

Template.PayoutsDemoUpdate.helpers({
	
});

Template.PayoutsDemoUpdateForm.onCreated(function() {
	
});

Template.PayoutsDemoUpdateForm.onDestroyed(function() {
	
});

Template.PayoutsDemoUpdateForm.onRendered(function() {
	

	pageSession.set("payoutsDemoUpdateFormInfoMessage", "");
	pageSession.set("payoutsDemoUpdateFormErrorMessage", "");

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

Template.PayoutsDemoUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("payoutsDemoUpdateFormInfoMessage", "");
		pageSession.set("payoutsDemoUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var payoutsDemoUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(payoutsDemoUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("payoutsDemoUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("payouts_demo", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("payoutsDemoUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("payouts2Update", t.data.payout_2._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("payouts_demo", mergeObjects(Router.currentRouteParams(), {}));
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

Template.PayoutsDemoUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("payoutsDemoUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("payoutsDemoUpdateFormErrorMessage");
	}
	
});
