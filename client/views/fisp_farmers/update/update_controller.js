this.FispFarmersUpdateController = RouteController.extend({
	template: "FispFarmersUpdate",
	

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
			Meteor.subscribe("fisp_farmer1", this.params.fispFarmerId)
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
			fisp_farmer1: FispFarmers.findOne({_id:this.params.fispFarmerId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});