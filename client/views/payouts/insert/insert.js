var pageSession = new ReactiveDict();

Template.PayoutsInsert.onCreated(function() {
	
});

Template.PayoutsInsert.onDestroyed(function() {
	
});

Template.PayoutsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PayoutsInsert.events({
	
});

Template.PayoutsInsert.helpers({
	
});

Template.PayoutsInsertForm.onCreated(function() {
	
});

Template.PayoutsInsertForm.onDestroyed(function() {
	
});

Template.PayoutsInsertForm.onRendered(function() {
	

	pageSession.set("payoutsInsertFormInfoMessage", "");
	pageSession.set("payoutsInsertFormErrorMessage", "");

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

Template.PayoutsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("payoutsInsertFormInfoMessage", "");
		pageSession.set("payoutsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var payoutsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(payoutsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("payoutsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("payouts", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("payoutsInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("xPayoutsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.PayoutsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("payoutsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("payoutsInsertFormErrorMessage");
	}
	
});
