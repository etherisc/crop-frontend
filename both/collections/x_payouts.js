this.XPayouts = new Mongo.Collection("x_payouts");

this.XPayouts.userCanInsert = function(userId, doc) {
	return true;
};

this.XPayouts.userCanUpdate = function(userId, doc) {
	return true;
};

this.XPayouts.userCanRemove = function(userId, doc) {
	return true;
};
