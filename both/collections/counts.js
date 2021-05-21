this.Counts = new Mongo.Collection("counts");

this.Counts.userCanInsert = function(userId, doc) {
	return true;
};

this.Counts.userCanUpdate = function(userId, doc) {
	return true;
};

this.Counts.userCanRemove = function(userId, doc) {
	return true;
};
