this.ContractReview = new Mongo.Collection("contract_review");

this.ContractReview.userCanInsert = function(userId, doc) {
	return true;
};

this.ContractReview.userCanUpdate = function(userId, doc) {
	return true;
};

this.ContractReview.userCanRemove = function(userId, doc) {
	return true;
};
