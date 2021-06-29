var pageSession = new ReactiveDict();

Template.AdminLogsSmsDetails.onCreated(function() {
	
});

Template.AdminLogsSmsDetails.onDestroyed(function() {
	
});

Template.AdminLogsSmsDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AdminLogsSmsDetails.events({
	
});

Template.AdminLogsSmsDetails.helpers({
	
});

Template.AdminLogsSmsDetailsForm.onCreated(function() {
	
});

Template.AdminLogsSmsDetailsForm.onDestroyed(function() {
	
});

Template.AdminLogsSmsDetailsForm.onRendered(function() {
	

	pageSession.set("adminLogsSmsDetailsFormInfoMessage", "");
	pageSession.set("adminLogsSmsDetailsFormErrorMessage", "");

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

Template.AdminLogsSmsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminLogsSmsDetailsFormInfoMessage", "");
		pageSession.set("adminLogsSmsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var adminLogsSmsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminLogsSmsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminLogsSmsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminLogsSmsDetailsFormErrorMessage", message);
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

		Router.go("admin.logs_sms", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.logs_sms", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AdminLogsSmsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminLogsSmsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminLogsSmsDetailsFormErrorMessage");
	}
	
});

Template.AdminLogsSmsDetailsFormCustomActions.created = function() {

};

Template.AdminLogsSmsDetailsFormCustomActions.destroyed = function() {

};

Template.AdminLogsSmsDetailsFormCustomActions.rendered = function() {

};

Template.AdminLogsSmsDetailsFormCustomActions.helpers({

});

Template.AdminLogsSmsDetailsFormCustomActions.events({
	"click #btn-receipt": function (e,t) {
		e.preventDefault();
		Meteor.call('bongaFetchDeliveryReport', t.data.logline_sms._id);
	},
});
