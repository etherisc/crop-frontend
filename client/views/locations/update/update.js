var pageSession = new ReactiveDict();

Template.LocationsUpdate.onCreated(function() {
	
});

Template.LocationsUpdate.onDestroyed(function() {
	
});

Template.LocationsUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.LocationsUpdate.events({
	
});

Template.LocationsUpdate.helpers({
	
});

Template.LocationsUpdateForm.onCreated(function() {
	
});

Template.LocationsUpdateForm.onDestroyed(function() {
	
});

Template.LocationsUpdateForm.onRendered(function() {
	

	pageSession.set("locationsUpdateFormInfoMessage", "");
	pageSession.set("locationsUpdateFormErrorMessage", "");

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

Template.LocationsUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("locationsUpdateFormInfoMessage", "");
		pageSession.set("locationsUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var locationsUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(locationsUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("locationsUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("locations", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("locationsUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("locationsUpdate", t.data.location._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.LocationsUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("locationsUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("locationsUpdateFormErrorMessage");
	}
	
});
