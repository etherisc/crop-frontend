var pageSession = new ReactiveDict();

Template.PartnersInsert.onCreated(function() {
	
});

Template.PartnersInsert.onDestroyed(function() {
	
});

Template.PartnersInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.PartnersInsert.events({
	
});

Template.PartnersInsert.helpers({
	
});

Template.PartnersInsertForm.onCreated(function() {
	
});

Template.PartnersInsertForm.onDestroyed(function() {
	
});

Template.PartnersInsertForm.onRendered(function() {
	

	pageSession.set("partnersInsertFormInfoMessage", "");
	pageSession.set("partnersInsertFormErrorMessage", "");

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

Template.PartnersInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("partnersInsertFormInfoMessage", "");
		pageSession.set("partnersInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var partnersInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(partnersInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("partnersInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("partners", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("partnersInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("partnersInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.PartnersInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("partnersInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("partnersInsertFormErrorMessage");
	}
	
});
