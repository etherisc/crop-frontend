Meteor.methods({
	"codesInsert": function(data) {
		if(!Codes.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Codes.insert(data);
	},

	"codesUpdate": function(id, data) {
		var doc = Codes.findOne({ _id: id });
		if(!Codes.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Codes.update({ _id: id }, { $set: data });
	},

	"codesRemove": function(id) {
		var doc = Codes.findOne({ _id: id });
		if(!Codes.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Codes.remove({ _id: id });
	}
});
