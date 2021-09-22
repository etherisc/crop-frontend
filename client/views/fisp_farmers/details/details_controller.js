this.FispFarmersDetailsController = RouteController.extend({
	template: "FispFarmersDetails",
	

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
			Meteor.subscribe("fisp_farmer", this.params.fispFarmerId)
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
			fisp_farmer: FispFarmers.findOne({_id:this.params.fispFarmerId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});