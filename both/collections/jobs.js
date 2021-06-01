this.Jobs = new Mongo.Collection("jobs");

this.Jobs.userCanInsert = function(userId, doc) {
	return true;
};

this.Jobs.userCanUpdate = function(userId, doc) {
	return true;
};

this.Jobs.userCanRemove = function(userId, doc) {
	return true;
};
