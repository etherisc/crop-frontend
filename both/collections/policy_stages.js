this.PolicyStages = new Mongo.Collection("policy_stages");

this.PolicyStages.userCanInsert = function(userId, doc) {
	return true;
};

this.PolicyStages.userCanUpdate = function(userId, doc) {
	return true;
};

this.PolicyStages.userCanRemove = function(userId, doc) {
	return true;
};
