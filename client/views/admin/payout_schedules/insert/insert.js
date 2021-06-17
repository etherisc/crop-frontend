var pageSession = new ReactiveDict();

Template.AdminPayoutSchedulesInsert.onCreated(function() {
	
});

Template.AdminPayoutSchedulesInsert.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminPayoutSchedulesInsert.events({
	
});

Template.AdminPayoutSchedulesInsert.helpers({
	
});

Template.AdminPayoutSchedulesInsertForm.onCreated(function() {
	
});

Template.AdminPayoutSchedulesInsertForm.onDestroyed(function() {
	
});

Template.AdminPayoutSchedulesInsertForm.onRendered(function() {
	

	pageSession.set("adminPayoutSchedulesInsertFormInfoMessage", "");
	pageSession.set("adminPayoutSchedulesInsertFormErrorMessage", "");

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

Template.AdminPayoutSchedulesInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminPayoutSchedulesInsertFormInfoMessage", "");
		pageSession.set("adminPayoutSchedulesInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminPayoutSchedulesInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminPayoutSchedulesInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminPayoutSchedulesInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.payout_schedules", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminPayoutSchedulesInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				/** On Submit **/
if (!values.status) values.status = '0';
 Meteor.call("payoutSchedulesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.AdminPayoutSchedulesInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminPayoutSchedulesInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminPayoutSchedulesInsertFormErrorMessage");
	}
	
});
