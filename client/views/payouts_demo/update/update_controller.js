this.PayoutsDemoUpdateController = RouteController.extend({
	template: "PayoutsDemoUpdate",
	

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
			Meteor.subscribe("payout_2", this.params.payout2Id)
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
			payout_2: Payouts2.findOne({_id:this.params.payout2Id}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});