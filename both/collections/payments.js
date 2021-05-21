this.Payments = new Mongo.Collection("payments");

this.Payments.userCanInsert = function(userId, doc) {
	return true;
};

this.Payments.userCanUpdate = function(userId, doc) {
	return true;
};

this.Payments.userCanRemove = function(userId, doc) {
	return true;
};
