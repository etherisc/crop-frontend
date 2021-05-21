Meteor.methods({
	"countsInsert": function(data) {
		if(!Counts.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Counts.insert(data);
	},

	"countsUpdate": function(id, data) {
		var doc = Counts.findOne({ _id: id });
		if(!Counts.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Counts.update({ _id: id }, { $set: data });
	},

	"countsRemove": function(id) {
		var doc = Counts.findOne({ _id: id });
		if(!Counts.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Counts.remove({ _id: id });
	}
});
