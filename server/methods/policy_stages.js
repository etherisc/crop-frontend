Meteor.methods({
	"policyStagesInsert": function(data) {
		if(!PolicyStages.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return PolicyStages.insert(data);
	},

	"policyStagesUpdate": function(id, data) {
		var doc = PolicyStages.findOne({ _id: id });
		if(!PolicyStages.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		PolicyStages.update({ _id: id }, { $set: data });
	},

	"policyStagesRemove": function(id) {
		var doc = PolicyStages.findOne({ _id: id });
		if(!PolicyStages.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		PolicyStages.remove({ _id: id });
	}
});
