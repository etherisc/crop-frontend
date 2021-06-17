this.XArc2Data = new Mongo.Collection("x_arc2_data");

this.XArc2Data.userCanInsert = function(userId, doc) {
	return true;
};

this.XArc2Data.userCanUpdate = function(userId, doc) {
	return true;
};

this.XArc2Data.userCanRemove = function(userId, doc) {
	return true;
};
