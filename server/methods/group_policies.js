Meteor.methods({
	"groupPoliciesInsert": function(data) {
		if(!GroupPolicies.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return GroupPolicies.insert(data);
	},

	"groupPoliciesUpdate": function(id, data) {
		var doc = GroupPolicies.findOne({ _id: id });
		if(!GroupPolicies.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		GroupPolicies.update({ _id: id }, { $set: data });
	},

	"groupPoliciesRemove": function(id) {
		var doc = GroupPolicies.findOne({ _id: id });
		if(!GroupPolicies.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		GroupPolicies.remove({ _id: id });
	}
});
