this.XContractReview = new Mongo.Collection("x_contract_review");

this.XContractReview.userCanInsert = function(userId, doc) {
	return true;
};

this.XContractReview.userCanUpdate = function(userId, doc) {
	return true;
};

this.XContractReview.userCanRemove = function(userId, doc) {
	return true;
};
