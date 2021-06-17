Meteor.methods({
	"xAuditTrailInsert": function(data) {
		if(!XAuditTrail.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return XAuditTrail.insert(data);
	},

	"xAuditTrailUpdate": function(id, data) {
		var doc = XAuditTrail.findOne({ _id: id });
		if(!XAuditTrail.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XAuditTrail.update({ _id: id }, { $set: data });
	},

	"xAuditTrailRemove": function(id) {
		var doc = XAuditTrail.findOne({ _id: id });
		if(!XAuditTrail.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XAuditTrail.remove({ _id: id });
	}
});
