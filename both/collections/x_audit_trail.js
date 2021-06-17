this.XAuditTrail = new Mongo.Collection("x_audit_trail");

this.XAuditTrail.userCanInsert = function(userId, doc) {
	return true;
};

this.XAuditTrail.userCanUpdate = function(userId, doc) {
	return true;
};

this.XAuditTrail.userCanRemove = function(userId, doc) {
	return true;
};
