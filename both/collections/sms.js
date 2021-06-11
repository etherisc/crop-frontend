this.Sms = new Mongo.Collection("sms");

this.Sms.userCanInsert = function(userId, doc) {
	return true;
};

this.Sms.userCanUpdate = function(userId, doc) {
	return true;
};

this.Sms.userCanRemove = function(userId, doc) {
	return true;
};
