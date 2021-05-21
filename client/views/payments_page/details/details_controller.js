this.PaymentsPageDetailsController = RouteController.extend({
	template: "PaymentsPageDetails",
	

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
			Meteor.subscribe("payment", this.params.paymentId)
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
			payment: Payments.findOne({_id:this.params.paymentId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});