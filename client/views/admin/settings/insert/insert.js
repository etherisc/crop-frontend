var pageSession = new ReactiveDict();

Template.AdminSettingsInsert.onCreated(function() {
	
});

Template.AdminSettingsInsert.onDestroyed(function() {
	
});

Template.AdminSettingsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminSettingsInsert.events({
	
});

Template.AdminSettingsInsert.helpers({
	
});

Template.AdminSettingsInsertForm.onCreated(function() {
	
});

Template.AdminSettingsInsertForm.onDestroyed(function() {
	
});

Template.AdminSettingsInsertForm.onRendered(function() {
	

	pageSession.set("adminSettingsInsertFormInfoMessage", "");
	pageSession.set("adminSettingsInsertFormErrorMessage", "");

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

Template.AdminSettingsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminSettingsInsertFormInfoMessage", "");
		pageSession.set("adminSettingsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminSettingsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminSettingsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminSettingsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.settings", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminSettingsInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("settingsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.AdminSettingsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminSettingsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminSettingsInsertFormErrorMessage");
	}
	
});
