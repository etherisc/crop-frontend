this.Locations = new Mongo.Collection("locations");

this.Locations.userCanInsert = function(userId, doc) {
	return true;
};

this.Locations.userCanUpdate = function(userId, doc) {
	return true;
};

this.Locations.userCanRemove = function(userId, doc) {
	return true;
};
