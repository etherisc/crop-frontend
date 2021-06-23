Meteor.publish("gp_crop_stages_list", function(groupPolicyId) {
	return CropStages.find({gp_mongo_id:groupPolicyId}, {});
});

