Meteor.methods({
	"iPoliciesInsert": function(data) {
		if(!IPolicies.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return IPolicies.insert(data);
	},

	"iPoliciesUpdate": function(id, data) {
		var doc = IPolicies.findOne({ _id: id });
		if(!IPolicies.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		IPolicies.update({ _id: id }, { $set: data });
	},

	"iPoliciesRemove": function(id) {
		var doc = IPolicies.findOne({ _id: id });
		if(!IPolicies.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		IPolicies.remove({ _id: id });
	}
});
