this.Notifications = new Mongo.Collection("notifications");

this.Notifications.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","blocked","user"]);
};

this.Notifications.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","blocked","user"]));
};

this.Notifications.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin","blocked","user"]));
};
