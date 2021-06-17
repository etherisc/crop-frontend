this.XPolicyStages = new Mongo.Collection("x_policy_stages");

this.XPolicyStages.userCanInsert = function(userId, doc) {
	return true;
};

this.XPolicyStages.userCanUpdate = function(userId, doc) {
	return true;
};

this.XPolicyStages.userCanRemove = function(userId, doc) {
	return true;
};
