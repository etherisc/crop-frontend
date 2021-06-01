Meteor.methods({
	"jobsInsert": function(data) {
		if(!Jobs.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Jobs.insert(data);
	},

	"jobsUpdate": function(id, data) {
		var doc = Jobs.findOne({ _id: id });
		if(!Jobs.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Jobs.update({ _id: id }, { $set: data });
	},

	"jobsRemove": function(id) {
		var doc = Jobs.findOne({ _id: id });
		if(!Jobs.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Jobs.remove({ _id: id });
	}
});
