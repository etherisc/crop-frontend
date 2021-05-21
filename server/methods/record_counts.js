Meteor.methods({
	"recordCountsInsert": function(data) {
		if(!RecordCounts.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return RecordCounts.insert(data);
	},

	"recordCountsUpdate": function(id, data) {
		var doc = RecordCounts.findOne({ _id: id });
		if(!RecordCounts.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		RecordCounts.update({ _id: id }, { $set: data });
	},

	"recordCountsRemove": function(id) {
		var doc = RecordCounts.findOne({ _id: id });
		if(!RecordCounts.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		RecordCounts.remove({ _id: id });
	}
});
