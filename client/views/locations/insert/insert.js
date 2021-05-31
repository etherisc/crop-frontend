var pageSession = new ReactiveDict();

Template.LocationsInsert.onCreated(function() {
	
});

Template.LocationsInsert.onDestroyed(function() {
	
});

Template.LocationsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LocationsInsert.events({
	
});

Template.LocationsInsert.helpers({
	
});

Template.LocationsInsertForm.onCreated(function() {
	
});

Template.LocationsInsertForm.onDestroyed(function() {
	
});

Template.LocationsInsertForm.onRendered(function() {
	

	pageSession.set("locationsInsertFormInfoMessage", "");
	pageSession.set("locationsInsertFormErrorMessage", "");

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

Template.LocationsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("locationsInsertFormInfoMessage", "");
		pageSession.set("locationsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var locationsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(locationsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("locationsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("locations", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("locationsInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("locationsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("locations", mergeObjects(Router.currentRouteParams(), {}));
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

Template.LocationsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("locationsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("locationsInsertFormErrorMessage");
	}
	
});
