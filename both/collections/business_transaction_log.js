this.BusinessTransactionLog = new Mongo.Collection("business_transaction_log");

this.BusinessTransactionLog.userCanInsert = function(userId, doc) {
	return true;
};

this.BusinessTransactionLog.userCanUpdate = function(userId, doc) {
	return true;
};

this.BusinessTransactionLog.userCanRemove = function(userId, doc) {
	return true;
};
