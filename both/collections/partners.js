this.Partners = new Mongo.Collection("partners");

this.Partners.userCanInsert = function(userId, doc) {
	return true;
};

this.Partners.userCanUpdate = function(userId, doc) {
	return true;
};

this.Partners.userCanRemove = function(userId, doc) {
	return true;
};
