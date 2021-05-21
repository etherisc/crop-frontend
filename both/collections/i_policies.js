this.IPolicies = new Mongo.Collection("i_policies");

this.IPolicies.userCanInsert = function(userId, doc) {
	return true;
};

this.IPolicies.userCanUpdate = function(userId, doc) {
	return true;
};

this.IPolicies.userCanRemove = function(userId, doc) {
	return true;
};
