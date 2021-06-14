var pageSession = new ReactiveDict();

Template.AdminNotificationsInsert.onCreated(function() {
	
});

Template.AdminNotificationsInsert.onDestroyed(function() {
	
});

Template.AdminNotificationsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminNotificationsInsert.events({
	
});

Template.AdminNotificationsInsert.helpers({
	
});

Template.AdminNotificationsInsertForm.onCreated(function() {
	
});

Template.AdminNotificationsInsertForm.onDestroyed(function() {
	
});

Template.AdminNotificationsInsertForm.onRendered(function() {
	

	pageSession.set("adminNotificationsInsertFormInfoMessage", "");
	pageSession.set("adminNotificationsInsertFormErrorMessage", "");

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

Template.AdminNotificationsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminNotificationsInsertFormInfoMessage", "");
		pageSession.set("adminNotificationsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminNotificationsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminNotificationsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminNotificationsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.notifications", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminNotificationsInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("notificationsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.notifications", mergeObjects(Router.currentRouteParams(), {}));
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

Template.AdminNotificationsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminNotificationsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminNotificationsInsertFormErrorMessage");
	}
	
});
