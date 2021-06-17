var pageSession = new ReactiveDict();

Template.PoliciesPageUpdate.onCreated(function() {
	
});

Template.PoliciesPageUpdate.onDestroyed(function() {
	
});

Template.PoliciesPageUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPageUpdate.events({
	
});

Template.PoliciesPageUpdate.helpers({
	
});

Template.PoliciesPageUpdateForm.onCreated(function() {
	
});

Template.PoliciesPageUpdateForm.onDestroyed(function() {
	
});

Template.PoliciesPageUpdateForm.onRendered(function() {
	

	pageSession.set("policiesPageUpdateFormInfoMessage", "");
	pageSession.set("policiesPageUpdateFormErrorMessage", "");

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

Template.PoliciesPageUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("policiesPageUpdateFormInfoMessage", "");
		pageSession.set("policiesPageUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var policiesPageUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(policiesPageUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("policiesPageUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("policies_page", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("policiesPageUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("xPoliciesUpdate", t.data.policy._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("policies_page", mergeObjects(Router.currentRouteParams(), {}));
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

Template.PoliciesPageUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("policiesPageUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("policiesPageUpdateFormErrorMessage");
	}
	
});
