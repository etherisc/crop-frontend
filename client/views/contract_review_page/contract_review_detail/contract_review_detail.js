var pageSession = new ReactiveDict();

Template.ContractReviewPageContractReviewDetail.onCreated(function() {
	
});

Template.ContractReviewPageContractReviewDetail.onDestroyed(function() {
	
});

Template.ContractReviewPageContractReviewDetail.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.ContractReviewPageContractReviewDetail.events({
	
});

Template.ContractReviewPageContractReviewDetail.helpers({
	
});

Template.ContractReviewPageContractReviewDetailForm.onCreated(function() {
	
});

Template.ContractReviewPageContractReviewDetailForm.onDestroyed(function() {
	
});

Template.ContractReviewPageContractReviewDetailForm.onRendered(function() {
	

	pageSession.set("contractReviewPageContractReviewDetailFormInfoMessage", "");
	pageSession.set("contractReviewPageContractReviewDetailFormErrorMessage", "");

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

Template.ContractReviewPageContractReviewDetailForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("contractReviewPageContractReviewDetailFormInfoMessage", "");
		pageSession.set("contractReviewPageContractReviewDetailFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var contractReviewPageContractReviewDetailFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(contractReviewPageContractReviewDetailFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("contractReviewPageContractReviewDetailFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("contractReviewPageContractReviewDetailFormErrorMessage", message);
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

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("contract_review_page", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ContractReviewPageContractReviewDetailForm.helpers({
	"infoMessage": function() {
		return pageSession.get("contractReviewPageContractReviewDetailFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("contractReviewPageContractReviewDetailFormErrorMessage");
	}
	
});
