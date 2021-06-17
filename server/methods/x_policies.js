Meteor.methods({
	"xPoliciesInsert": function(data) {
		if(!XPolicies.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return XPolicies.insert(data);
	},

	"xPoliciesUpdate": function(id, data) {
		var doc = XPolicies.findOne({ _id: id });
		if(!XPolicies.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XPolicies.update({ _id: id }, { $set: data });
	},

	"xPoliciesRemove": function(id) {
		var doc = XPolicies.findOne({ _id: id });
		if(!XPolicies.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XPolicies.remove({ _id: id });
	}
});
