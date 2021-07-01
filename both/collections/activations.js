this.Activations = new Mongo.Collection("activations");

this.Activations.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","blocked","user"]);
};

this.Activations.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","blocked","user"]));
};

this.Activations.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","blocked","user"]));
};
