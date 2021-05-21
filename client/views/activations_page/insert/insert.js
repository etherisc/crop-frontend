var pageSession = new ReactiveDict();

Template.ActivationsPageInsert.onCreated(function() {
	
});

Template.ActivationsPageInsert.onDestroyed(function() {
	
});

Template.ActivationsPageInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ActivationsPageInsert.events({
	
});

Template.ActivationsPageInsert.helpers({
	
});

Template.ActivationsPageInsertForm.onCreated(function() {
	
});

Template.ActivationsPageInsertForm.onDestroyed(function() {
	
});

Template.ActivationsPageInsertForm.onRendered(function() {
	

	pageSession.set("activationsPageInsertFormInfoMessage", "");
	pageSession.set("activationsPageInsertFormErrorMessage", "");

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

Template.ActivationsPageInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("activationsPageInsertFormInfoMessage", "");
		pageSession.set("activationsPageInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var activationsPageInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(activationsPageInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("activationsPageInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("activations_page", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("activationsPageInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("activationsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.ActivationsPageInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("activationsPageInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("activationsPageInsertFormErrorMessage");
	}
	
});
