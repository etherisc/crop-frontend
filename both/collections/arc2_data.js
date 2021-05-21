this.Arc2Data = new Mongo.Collection("arc2_data");

this.Arc2Data.userCanInsert = function(userId, doc) {
	return true;
};

this.Arc2Data.userCanUpdate = function(userId, doc) {
	return true;
};

this.Arc2Data.userCanRemove = function(userId, doc) {
	return true;
};
