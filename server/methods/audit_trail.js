Meteor.methods({
	"auditTrailInsert": function(data) {
		if(!AuditTrail.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return AuditTrail.insert(data);
	},

	"auditTrailUpdate": function(id, data) {
		var doc = AuditTrail.findOne({ _id: id });
		if(!AuditTrail.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		AuditTrail.update({ _id: id }, { $set: data });
	},

	"auditTrailRemove": function(id) {
		var doc = AuditTrail.findOne({ _id: id });
		if(!AuditTrail.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		AuditTrail.remove({ _id: id });
	}
});
