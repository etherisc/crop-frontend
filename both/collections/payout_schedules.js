this.PayoutSchedules = new Mongo.Collection("payout_schedules");

this.PayoutSchedules.userCanInsert = function(userId, doc) {
	return true;
};

this.PayoutSchedules.userCanUpdate = function(userId, doc) {
	return true;
};

this.PayoutSchedules.userCanRemove = function(userId, doc) {
	return true;
};
