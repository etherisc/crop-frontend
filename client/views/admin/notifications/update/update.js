var pageSession = new ReactiveDict();

Template.AdminNotificationsUpdate.onCreated(function() {
	
});

Template.AdminNotificationsUpdate.onDestroyed(function() {
	
});

Template.AdminNotificationsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminNotificationsUpdate.events({
	
});

Template.AdminNotificationsUpdate.helpers({
	
});

Template.AdminNotificationsUpdateForm.onCreated(function() {
	
});

Template.AdminNotificationsUpdateForm.onDestroyed(function() {
	
});

Template.AdminNotificationsUpdateForm.onRendered(function() {
	

	pageSession.set("adminNotificationsUpdateFormInfoMessage", "");
	pageSession.set("adminNotificationsUpdateFormErrorMessage", "");

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

Template.AdminNotificationsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminNotificationsUpdateFormInfoMessage", "");
		pageSession.set("adminNotificationsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminNotificationsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminNotificationsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminNotificationsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.notifications", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminNotificationsUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("notificationsUpdate", t.data.notification._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.AdminNotificationsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminNotificationsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminNotificationsUpdateFormErrorMessage");
	}
	
});
