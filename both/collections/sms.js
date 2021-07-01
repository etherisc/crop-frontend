this.Sms = new Mongo.Collection("sms");

this.Sms.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","blocked","user"]);
};

this.Sms.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","blocked","user"]));
};

this.Sms.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","blocked","user"]));
};
