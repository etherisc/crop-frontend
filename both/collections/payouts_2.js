this.Payouts2 = new Mongo.Collection("payouts_2");

this.Payouts2.userCanInsert = function(userId, doc) {
	return true;
};

this.Payouts2.userCanUpdate = function(userId, doc) {
	return true;
};

this.Payouts2.userCanRemove = function(userId, doc) {
	return true;
};
