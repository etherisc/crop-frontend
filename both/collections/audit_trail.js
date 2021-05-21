this.AuditTrail = new Mongo.Collection("audit_trail");

this.AuditTrail.userCanInsert = function(userId, doc) {
	return true;
};

this.AuditTrail.userCanUpdate = function(userId, doc) {
	return true;
};

this.AuditTrail.userCanRemove = function(userId, doc) {
	return true;
};
