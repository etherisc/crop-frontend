this.Arc2DataPageDetailsController = RouteController.extend({
	template: "Arc2DataPageDetails",
	

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
			Meteor.subscribe("arc2row", this.params.arc2rowId)
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
			arc2row: Arc2Data.findOne({_id:this.params.arc2rowId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});