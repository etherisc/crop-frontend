var pageSession = new ReactiveDict();

Template.ActivationsPageUpdate.onCreated(function() {
	
});

Template.ActivationsPageUpdate.onDestroyed(function() {
	
});

Template.ActivationsPageUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ActivationsPageUpdate.events({
	
});

Template.ActivationsPageUpdate.helpers({
	
});

Template.ActivationsPageUpdateForm.onCreated(function() {
	
});

Template.ActivationsPageUpdateForm.onDestroyed(function() {
	
});

Template.ActivationsPageUpdateForm.onRendered(function() {
	

	pageSession.set("activationsPageUpdateFormInfoMessage", "");
	pageSession.set("activationsPageUpdateFormErrorMessage", "");

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

Template.ActivationsPageUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("activationsPageUpdateFormInfoMessage", "");
		pageSession.set("activationsPageUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var activationsPageUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(activationsPageUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("activationsPageUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("activations_page", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("activationsPageUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("activationsUpdate", t.data.activation._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("activations_page", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ActivationsPageUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("activationsPageUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("activationsPageUpdateFormErrorMessage");
	}
	
});
