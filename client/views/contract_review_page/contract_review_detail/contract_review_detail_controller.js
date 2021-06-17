this.ContractReviewPageContractReviewDetailController = RouteController.extend({
	template: "ContractReviewPageContractReviewDetail",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {


		

		var subs = [
			Meteor.subscribe("contract_review_detail", this.params.contractReviewId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			contract_review_detail: XContractReview.findOne({_id:this.params.contractReviewId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});