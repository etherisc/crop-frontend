var pageSession = new ReactiveDict();

Template.ActivationsPageDetails.onCreated(function() {
	
});

Template.ActivationsPageDetails.onDestroyed(function() {
	
});

Template.ActivationsPageDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ActivationsPageDetails.events({
	
});

Template.ActivationsPageDetails.helpers({
	
});

Template.ActivationsPageDetailsForm.onCreated(function() {
	
});

Template.ActivationsPageDetailsForm.onDestroyed(function() {
	
});

Template.ActivationsPageDetailsForm.onRendered(function() {
	

	pageSession.set("activationsPageDetailsFormInfoMessage", "");
	pageSession.set("activationsPageDetailsFormErrorMessage", "");

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

Template.ActivationsPageDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("activationsPageDetailsFormInfoMessage", "");
		pageSession.set("activationsPageDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var activationsPageDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(activationsPageDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("activationsPageDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("activationsPageDetailsFormErrorMessage", message);
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

		Router.go("activations_page", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("activations_page", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ActivationsPageDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("activationsPageDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("activationsPageDetailsFormErrorMessage");
	}
	
});

Template.ActivationsPageDetailsFormCustomActions.created = function() {

};

Template.ActivationsPageDetailsFormCustomActions.destroyed = function() {

};

Template.ActivationsPageDetailsFormCustomActions.rendered = function() {

};

Template.ActivationsPageDetailsFormCustomActions.helpers({

});

Template.ActivationsPageDetailsFormCustomActions.events({

	"click #btn-apply": function (e,t) {
		e.preventDefault();

		toast_confirm('Really?').then((confirm) => {
			if(confirm) {

				Meteor.call('applyForPolicy', t.data, function(err, res) {

					if(err) {
						toast_error(err.message);
					} else {
						toast_info(res);
					}

				});
			}
		})


		return false;
	}

});
