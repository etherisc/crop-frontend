this.Codes = new Mongo.Collection("codes");

this.Codes.userCanInsert = function(userId, doc) {
	return true;
};

this.Codes.userCanUpdate = function(userId, doc) {
	return true;
};

this.Codes.userCanRemove = function(userId, doc) {
	return true;
};
