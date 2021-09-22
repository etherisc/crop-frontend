var pageSession = new ReactiveDict();

Template.FispFarmersUpdate.onCreated(function() {
	
});

Template.FispFarmersUpdate.onDestroyed(function() {
	
});

Template.FispFarmersUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.FispFarmersUpdate.events({
	
});

Template.FispFarmersUpdate.helpers({
	
});

Template.FispFarmersUpdateForm.onCreated(function() {
	
});

Template.FispFarmersUpdateForm.onDestroyed(function() {
	
});

Template.FispFarmersUpdateForm.onRendered(function() {
	

	pageSession.set("fispFarmersUpdateFormInfoMessage", "");
	pageSession.set("fispFarmersUpdateFormErrorMessage", "");

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

Template.FispFarmersUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("fispFarmersUpdateFormInfoMessage", "");
		pageSession.set("fispFarmersUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var fispFarmersUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(fispFarmersUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("fispFarmersUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("fisp_farmers", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("fispFarmersUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("fispFarmersUpdate", t.data.fisp_farmer1._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("fisp_farmers", mergeObjects(Router.currentRouteParams(), {}));
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

Template.FispFarmersUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("fispFarmersUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("fispFarmersUpdateFormErrorMessage");
	}
	
});
