Meteor.methods({
	"emptyInsert": function(data) {
		if(!Empty.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Empty.insert(data);
	},

	"emptyUpdate": function(id, data) {
		var doc = Empty.findOne({ _id: id });
		if(!Empty.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Empty.update({ _id: id }, { $set: data });
	},

	"emptyRemove": function(id) {
		var doc = Empty.findOne({ _id: id });
		if(!Empty.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Empty.remove({ _id: id });
	}
});
