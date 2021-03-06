var pageSession = new ReactiveDict();

Template.PaymentsPageInsert.onCreated(function() {
	
});

Template.PaymentsPageInsert.onDestroyed(function() {
	
});

Template.PaymentsPageInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PaymentsPageInsert.events({
	
});

Template.PaymentsPageInsert.helpers({
	
});

Template.PaymentsPageInsertForm.onCreated(function() {
	
});

Template.PaymentsPageInsertForm.onDestroyed(function() {
	
});

Template.PaymentsPageInsertForm.onRendered(function() {
	

	pageSession.set("paymentsPageInsertFormInfoMessage", "");
	pageSession.set("paymentsPageInsertFormErrorMessage", "");

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

Template.PaymentsPageInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("paymentsPageInsertFormInfoMessage", "");
		pageSession.set("paymentsPageInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var paymentsPageInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(paymentsPageInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("paymentsPageInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("payments_page", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("paymentsPageInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("paymentsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.PaymentsPageInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("paymentsPageInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("paymentsPageInsertFormErrorMessage");
	}
	
});
