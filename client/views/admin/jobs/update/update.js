var pageSession = new ReactiveDict();

Template.AdminJobsUpdate.onCreated(function() {
	
});

Template.AdminJobsUpdate.onDestroyed(function() {
	
});

Template.AdminJobsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminJobsUpdate.events({
	
});

Template.AdminJobsUpdate.helpers({
	
});

Template.AdminJobsUpdateForm.onCreated(function() {
	
});

Template.AdminJobsUpdateForm.onDestroyed(function() {
	
});

Template.AdminJobsUpdateForm.onRendered(function() {
	

	pageSession.set("adminJobsUpdateFormInfoMessage", "");
	pageSession.set("adminJobsUpdateFormErrorMessage", "");

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

Template.AdminJobsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminJobsUpdateFormInfoMessage", "");
		pageSession.set("adminJobsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminJobsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(adminJobsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminJobsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.jobs", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminJobsUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("jobsUpdate", t.data.job._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.jobs", mergeObjects(Router.currentRouteParams(), {}));
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

Template.AdminJobsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminJobsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminJobsUpdateFormErrorMessage");
	}
	
});
