var pageSession = new ReactiveDict();

Template.CodesPageUpdate.onCreated(function() {
	
});

Template.CodesPageUpdate.onDestroyed(function() {
	
});

Template.CodesPageUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CodesPageUpdate.events({
	
});

Template.CodesPageUpdate.helpers({
	
});

Template.CodesPageUpdateForm.onCreated(function() {
	
});

Template.CodesPageUpdateForm.onDestroyed(function() {
	
});

Template.CodesPageUpdateForm.onRendered(function() {
	

	pageSession.set("codesPageUpdateFormInfoMessage", "");
	pageSession.set("codesPageUpdateFormErrorMessage", "");

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

Template.CodesPageUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("codesPageUpdateFormInfoMessage", "");
		pageSession.set("codesPageUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var codesPageUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(codesPageUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("codesPageUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("codes_page", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("codesPageUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("codesUpdate", t.data.code._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.CodesPageUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("codesPageUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("codesPageUpdateFormErrorMessage");
	}
	
});
