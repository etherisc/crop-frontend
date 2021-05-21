var pageSession = new ReactiveDict();

Template.PayoutsDemoInsert.onCreated(function() {
	
});

Template.PayoutsDemoInsert.onDestroyed(function() {
	
});

Template.PayoutsDemoInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PayoutsDemoInsert.events({
	
});

Template.PayoutsDemoInsert.helpers({
	
});

Template.PayoutsDemoInsertForm.onCreated(function() {
	
});

Template.PayoutsDemoInsertForm.onDestroyed(function() {
	
});

Template.PayoutsDemoInsertForm.onRendered(function() {
	

	pageSession.set("payoutsDemoInsertFormInfoMessage", "");
	pageSession.set("payoutsDemoInsertFormErrorMessage", "");

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

Template.PayoutsDemoInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("payoutsDemoInsertFormInfoMessage", "");
		pageSession.set("payoutsDemoInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var payoutsDemoInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(payoutsDemoInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("payoutsDemoInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("payouts_demo", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("payoutsDemoInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("payouts2Insert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.PayoutsDemoInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("payoutsDemoInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("payoutsDemoInsertFormErrorMessage");
	}
	
});
