var pageSession = new ReactiveDict();

Template.AdminImportJobsUpdate.onCreated(function() {
	
});

Template.AdminImportJobsUpdate.onDestroyed(function() {
	
});

Template.AdminImportJobsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminImportJobsUpdate.events({
	
});

Template.AdminImportJobsUpdate.helpers({
	
});

Template.AdminImportJobsUpdateForm.onCreated(function() {
	
});

Template.AdminImportJobsUpdateForm.onDestroyed(function() {
	
});

Template.AdminImportJobsUpdateForm.onRendered(function() {
	

	pageSession.set("adminImportJobsUpdateFormInfoMessage", "");
	pageSession.set("adminImportJobsUpdateFormErrorMessage", "");

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

Template.AdminImportJobsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminImportJobsUpdateFormInfoMessage", "");
		pageSession.set("adminImportJobsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminImportJobsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminImportJobsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminImportJobsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.import_jobs", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminImportJobsUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("importJobsUpdate", t.data.import_job._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.AdminImportJobsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminImportJobsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminImportJobsUpdateFormErrorMessage");
	}
	
});
