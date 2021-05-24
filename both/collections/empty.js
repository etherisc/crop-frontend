this.Empty = new Mongo.Collection("empty");

this.Empty.userCanInsert = function(userId, doc) {
	return true;
};

this.Empty.userCanUpdate = function(userId, doc) {
	return true;
};

this.Empty.userCanRemove = function(userId, doc) {
	return true;
};
