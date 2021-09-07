this.DirectPayouts = new Mongo.Collection("direct_payouts");

this.DirectPayouts.userCanInsert = function(userId, doc) {
	return true;
};

this.DirectPayouts.userCanUpdate = function(userId, doc) {
	return true;
};

this.DirectPayouts.userCanRemove = function(userId, doc) {
	return true;
};
