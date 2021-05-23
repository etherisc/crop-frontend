this.ImportJobs = new Mongo.Collection("import_jobs");

this.ImportJobs.userCanInsert = function(userId, doc) {
	return true;
};

this.ImportJobs.userCanUpdate = function(userId, doc) {
	return true;
};

this.ImportJobs.userCanRemove = function(userId, doc) {
	return true;
};
