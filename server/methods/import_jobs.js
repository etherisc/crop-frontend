Meteor.methods({
	"importJobsInsert": function(data) {
		if(!ImportJobs.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return ImportJobs.insert(data);
	},

	"importJobsUpdate": function(id, data) {
		var doc = ImportJobs.findOne({ _id: id });
		if(!ImportJobs.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		ImportJobs.update({ _id: id }, { $set: data });
	},

	"importJobsRemove": function(id) {
		var doc = ImportJobs.findOne({ _id: id });
		if(!ImportJobs.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		ImportJobs.remove({ _id: id });
	}
});
