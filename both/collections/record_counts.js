this.RecordCounts = new Mongo.Collection("record_counts");

this.RecordCounts.userCanInsert = function(userId, doc) {
	return true;
};

this.RecordCounts.userCanUpdate = function(userId, doc) {
	return true;
};

this.RecordCounts.userCanRemove = function(userId, doc) {
	return true;
};
