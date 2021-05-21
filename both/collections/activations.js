this.Activations = new Mongo.Collection("activations");

this.Activations.userCanInsert = function(userId, doc) {
	return true;
};

this.Activations.userCanUpdate = function(userId, doc) {
	return true;
};

this.Activations.userCanRemove = function(userId, doc) {
	return true;
};
