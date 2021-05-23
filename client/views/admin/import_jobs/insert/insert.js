var pageSession = new ReactiveDict();

Template.AdminImportJobsInsert.onCreated(function() {
	
});

Template.AdminImportJobsInsert.onDestroyed(function() {
	
});

Template.AdminImportJobsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminImportJobsInsert.events({
	
});

Template.AdminImportJobsInsert.helpers({
	
});

Template.AdminImportJobsInsertForm.onCreated(function() {
	
});

Template.AdminImportJobsInsertForm.onDestroyed(function() {
	
});

Template.AdminImportJobsInsertForm.onRendered(function() {
	

	pageSession.set("adminImportJobsInsertFormInfoMessage", "");
	pageSession.set("adminImportJobsInsertFormErrorMessage", "");

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

Template.AdminImportJobsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminImportJobsInsertFormInfoMessage", "");
		pageSession.set("adminImportJobsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminImportJobsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminImportJobsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminImportJobsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.import_jobs", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminImportJobsInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("importJobsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.import_jobs", mergeObjects(Router.currentRouteParams(), {}));
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

Template.AdminImportJobsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminImportJobsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminImportJobsInsertFormErrorMessage");
	}
	
});
