var pageSession = new ReactiveDict();

Template.AdminSettingsUpdate.onCreated(function() {
	
});

Template.AdminSettingsUpdate.onDestroyed(function() {
	
});

Template.AdminSettingsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminSettingsUpdate.events({
	
});

Template.AdminSettingsUpdate.helpers({
	
});

Template.AdminSettingsUpdateForm.onCreated(function() {
	
});

Template.AdminSettingsUpdateForm.onDestroyed(function() {
	
});

Template.AdminSettingsUpdateForm.onRendered(function() {
	

	pageSession.set("adminSettingsUpdateFormInfoMessage", "");
	pageSession.set("adminSettingsUpdateFormErrorMessage", "");

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

Template.AdminSettingsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminSettingsUpdateFormInfoMessage", "");
		pageSession.set("adminSettingsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminSettingsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminSettingsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminSettingsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.settings", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminSettingsUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("settingsUpdate", t.data.setting._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.settings", mergeObjects(Router.currentRouteParams(), {}));
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

Template.AdminSettingsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminSettingsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminSettingsUpdateFormErrorMessage");
	}
	
});
