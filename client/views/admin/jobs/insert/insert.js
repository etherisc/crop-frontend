var pageSession = new ReactiveDict();

Template.AdminJobsInsert.onCreated(function() {
	
});

Template.AdminJobsInsert.onDestroyed(function() {
	
});

Template.AdminJobsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminJobsInsert.events({
	
});

Template.AdminJobsInsert.helpers({
	
});

Template.AdminJobsInsertForm.onCreated(function() {
	
});

Template.AdminJobsInsertForm.onDestroyed(function() {
	
});

Template.AdminJobsInsertForm.onRendered(function() {
	

	pageSession.set("adminJobsInsertFormInfoMessage", "");
	pageSession.set("adminJobsInsertFormErrorMessage", "");

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

Template.AdminJobsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminJobsInsertFormInfoMessage", "");
		pageSession.set("adminJobsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminJobsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminJobsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminJobsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.jobs", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminJobsInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("jobsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.AdminJobsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminJobsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminJobsInsertFormErrorMessage");
	}
	
});
