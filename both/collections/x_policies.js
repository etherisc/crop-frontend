this.XPolicies = new Mongo.Collection("x_policies");

this.XPolicies.userCanInsert = function(userId, doc) {
	return true;
};

this.XPolicies.userCanUpdate = function(userId, doc) {
	return true;
};

this.XPolicies.userCanRemove = function(userId, doc) {
	return true;
};
