Meteor.methods({
	"partnersInsert": function(data) {
		if(!Partners.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Partners.insert(data);
	},

	"partnersUpdate": function(id, data) {
		var doc = Partners.findOne({ _id: id });
		if(!Partners.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Partners.update({ _id: id }, { $set: data });
	},

	"partnersRemove": function(id) {
		var doc = Partners.findOne({ _id: id });
		if(!Partners.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Partners.remove({ _id: id });
	}
});
