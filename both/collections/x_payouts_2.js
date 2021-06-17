this.XPayouts2 = new Mongo.Collection("x_payouts_2");

this.XPayouts2.userCanInsert = function(userId, doc) {
	return true;
};

this.XPayouts2.userCanUpdate = function(userId, doc) {
	return true;
};

this.XPayouts2.userCanRemove = function(userId, doc) {
	return true;
};
