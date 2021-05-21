this.ActivationsPageUpdateController = RouteController.extend({
	template: "ActivationsPageUpdate",
	

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
			Meteor.subscribe("activation", this.params.activationId)
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
			activation: Activations.findOne({_id:this.params.activationId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});