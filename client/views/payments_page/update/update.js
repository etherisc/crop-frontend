var pageSession = new ReactiveDict();

Template.PaymentsPageUpdate.onCreated(function() {
	
});

Template.PaymentsPageUpdate.onDestroyed(function() {
	
});

Template.PaymentsPageUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PaymentsPageUpdate.events({
	
});

Template.PaymentsPageUpdate.helpers({
	
});

Template.PaymentsPageUpdateForm.onCreated(function() {
	
});

Template.PaymentsPageUpdateForm.onDestroyed(function() {
	
});

Template.PaymentsPageUpdateForm.onRendered(function() {
	

	pageSession.set("paymentsPageUpdateFormInfoMessage", "");
	pageSession.set("paymentsPageUpdateFormErrorMessage", "");

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

Template.PaymentsPageUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("paymentsPageUpdateFormInfoMessage", "");
		pageSession.set("paymentsPageUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var paymentsPageUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(paymentsPageUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("paymentsPageUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("payments_page", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("paymentsPageUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("paymentsUpdate", t.data.payment._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("payments_page", mergeObjects(Router.currentRouteParams(), {}));
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

Template.PaymentsPageUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("paymentsPageUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("paymentsPageUpdateFormErrorMessage");
	}
	
});
