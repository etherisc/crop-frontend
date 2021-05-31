var pageSession = new ReactiveDict();

Template.LocationsDetails.onCreated(function() {
	
});

Template.LocationsDetails.onDestroyed(function() {
	
});

Template.LocationsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LocationsDetails.events({
	
});

Template.LocationsDetails.helpers({
	
});

Template.LocationsDetailsForm.onCreated(function() {
	
});

Template.LocationsDetailsForm.onDestroyed(function() {
	
});

Template.LocationsDetailsForm.onRendered(function() {
	

	pageSession.set("locationsDetailsFormInfoMessage", "");
	pageSession.set("locationsDetailsFormErrorMessage", "");

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

Template.LocationsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("locationsDetailsFormInfoMessage", "");
		pageSession.set("locationsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var locationsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(locationsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("locationsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("locationsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("locations", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("locations", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.LocationsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("locationsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("locationsDetailsFormErrorMessage");
	}
	
});
