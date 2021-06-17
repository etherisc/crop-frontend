Meteor.methods({
	"xPolicyStagesInsert": function(data) {
		if(!XPolicyStages.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return XPolicyStages.insert(data);
	},

	"xPolicyStagesUpdate": function(id, data) {
		var doc = XPolicyStages.findOne({ _id: id });
		if(!XPolicyStages.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XPolicyStages.update({ _id: id }, { $set: data });
	},

	"xPolicyStagesRemove": function(id) {
		var doc = XPolicyStages.findOne({ _id: id });
		if(!XPolicyStages.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XPolicyStages.remove({ _id: id });
	}
});
