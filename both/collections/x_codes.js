this.XCodes = new Mongo.Collection("x_codes");

this.XCodes.userCanInsert = function(userId, doc) {
	return true;
};

this.XCodes.userCanUpdate = function(userId, doc) {
	return true;
};

this.XCodes.userCanRemove = function(userId, doc) {
	return true;
};
