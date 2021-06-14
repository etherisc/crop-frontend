this.Notifications = new Mongo.Collection("notifications");

this.Notifications.userCanInsert = function(userId, doc) {
	return true;
};

this.Notifications.userCanUpdate = function(userId, doc) {
	return true;
};

this.Notifications.userCanRemove = function(userId, doc) {
	return true;
};
