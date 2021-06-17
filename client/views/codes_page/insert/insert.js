var pageSession = new ReactiveDict();

Template.CodesPageInsert.onCreated(function() {
	
});

Template.CodesPageInsert.onDestroyed(function() {
	
});

Template.CodesPageInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CodesPageInsert.events({
	
});

Template.CodesPageInsert.helpers({
	
});

Template.CodesPageInsertForm.onCreated(function() {
	
});

Template.CodesPageInsertForm.onDestroyed(function() {
	
});

Template.CodesPageInsertForm.onRendered(function() {
	

	pageSession.set("codesPageInsertFormInfoMessage", "");
	pageSession.set("codesPageInsertFormErrorMessage", "");

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

Template.CodesPageInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("codesPageInsertFormInfoMessage", "");
		pageSession.set("codesPageInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var codesPageInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(codesPageInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("codesPageInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("codes_page", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("codesPageInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("xCodesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("codes_page", mergeObjects(Router.currentRouteParams(), {}));
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

Template.CodesPageInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("codesPageInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("codesPageInsertFormErrorMessage");
	}
	
});
