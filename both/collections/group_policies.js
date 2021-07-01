this.GroupPolicies = new Mongo.Collection("group_policies");

this.GroupPolicies.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","blocked","user"]);
};

this.GroupPolicies.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","blocked","user"]));
};

this.GroupPolicies.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","blocked","user"]));
};
