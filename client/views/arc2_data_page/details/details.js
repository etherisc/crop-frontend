var pageSession = new ReactiveDict();

Template.Arc2DataPageDetails.onCreated(function() {
	
});

Template.Arc2DataPageDetails.onDestroyed(function() {
	
});

Template.Arc2DataPageDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Arc2DataPageDetails.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("arc2_data_page", mergeObjects(Router.currentRouteParams(), {  }));
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("arc2_data_page", mergeObjects(Router.currentRouteParams(), {  }));
	}
});

Template.Arc2DataPageDetails.helpers({
	
});

Template.Arc2DataPageDetailsForm.onCreated(function() {
	
});

Template.Arc2DataPageDetailsForm.onDestroyed(function() {
	
});

Template.Arc2DataPageDetailsForm.onRendered(function() {
	

	pageSession.set("arc2DataPageDetailsFormInfoMessage", "");
	pageSession.set("arc2DataPageDetailsFormErrorMessage", "");

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

Template.Arc2DataPageDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("arc2DataPageDetailsFormInfoMessage", "");
		pageSession.set("arc2DataPageDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var arc2DataPageDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(arc2DataPageDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("arc2DataPageDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("arc2DataPageDetailsFormErrorMessage", message);
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

		Router.go("arc2_data_page", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("arc2_data_page", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.Arc2DataPageDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("arc2DataPageDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("arc2DataPageDetailsFormErrorMessage");
	}
	
});
