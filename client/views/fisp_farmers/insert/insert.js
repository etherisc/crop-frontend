var pageSession = new ReactiveDict();

Template.FispFarmersInsert.onCreated(function() {
	
});

Template.FispFarmersInsert.onDestroyed(function() {
	
});

Template.FispFarmersInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.FispFarmersInsert.events({
	
});

Template.FispFarmersInsert.helpers({
	
});

Template.FispFarmersInsertForm.onCreated(function() {
	
});

Template.FispFarmersInsertForm.onDestroyed(function() {
	
});

Template.FispFarmersInsertForm.onRendered(function() {
	

	pageSession.set("fispFarmersInsertFormInfoMessage", "");
	pageSession.set("fispFarmersInsertFormErrorMessage", "");

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

Template.FispFarmersInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("fispFarmersInsertFormInfoMessage", "");
		pageSession.set("fispFarmersInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var fispFarmersInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(fispFarmersInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("fispFarmersInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("fisp_farmers", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("fispFarmersInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("fispFarmersInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.FispFarmersInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("fispFarmersInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("fispFarmersInsertFormErrorMessage");
	}
	
});
