var pageSession = new ReactiveDict();

Template.PoliciesPageInsert.onCreated(function() {
	
});

Template.PoliciesPageInsert.onDestroyed(function() {
	
});

Template.PoliciesPageInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PoliciesPageInsert.events({
	
});

Template.PoliciesPageInsert.helpers({
	
});

Template.PoliciesPageInsertForm.onCreated(function() {
	
});

Template.PoliciesPageInsertForm.onDestroyed(function() {
	
});

Template.PoliciesPageInsertForm.onRendered(function() {
	

	pageSession.set("policiesPageInsertFormInfoMessage", "");
	pageSession.set("policiesPageInsertFormErrorMessage", "");

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

Template.PoliciesPageInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("policiesPageInsertFormInfoMessage", "");
		pageSession.set("policiesPageInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var policiesPageInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(policiesPageInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("policiesPageInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("policies_page", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("policiesPageInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("xPoliciesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.PoliciesPageInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("policiesPageInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("policiesPageInsertFormErrorMessage");
	}
	
});
