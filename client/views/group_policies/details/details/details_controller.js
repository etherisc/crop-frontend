this.GroupPoliciesDetailsDetailsController = RouteController.extend({
	template: "GroupPoliciesDetailsDetails",
	

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
			Meteor.subscribe("policy", this.params.policyId)
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
			policy: Policies.findOne({_nid:this.params.policyId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});