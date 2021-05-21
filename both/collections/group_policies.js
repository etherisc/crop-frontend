this.GroupPolicies = new Mongo.Collection("group_policies");

this.GroupPolicies.userCanInsert = function(userId, doc) {
	return true;
};

this.GroupPolicies.userCanUpdate = function(userId, doc) {
	return true;
};

this.GroupPolicies.userCanRemove = function(userId, doc) {
	return true;
};
