var pageSession = new ReactiveDict();

Template.PartnersUpdate.onCreated(function() {
	
});

Template.PartnersUpdate.onDestroyed(function() {
	
});

Template.PartnersUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PartnersUpdate.events({
	
});

Template.PartnersUpdate.helpers({
	
});

Template.PartnersUpdateForm.onCreated(function() {
	
});

Template.PartnersUpdateForm.onDestroyed(function() {
	
});

Template.PartnersUpdateForm.onRendered(function() {
	

	pageSession.set("partnersUpdateFormInfoMessage", "");
	pageSession.set("partnersUpdateFormErrorMessage", "");

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

Template.PartnersUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("partnersUpdateFormInfoMessage", "");
		pageSession.set("partnersUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var partnersUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(partnersUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("partnersUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("partners", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("partnersUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("partnersUpdate", t.data.partner._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("partners", mergeObjects(Router.currentRouteParams(), {}));
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

Template.PartnersUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("partnersUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("partnersUpdateFormErrorMessage");
	}
	
});
