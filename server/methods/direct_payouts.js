Meteor.methods({
	"directPayoutsInsert": function(data) {
		if(!DirectPayouts.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return DirectPayouts.insert(data);
	},

	"directPayoutsUpdate": function(id, data) {
		var doc = DirectPayouts.findOne({ _id: id });
		if(!DirectPayouts.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		DirectPayouts.update({ _id: id }, { $set: data });
	},

	"directPayoutsRemove": function(id) {
		var doc = DirectPayouts.findOne({ _id: id });
		if(!DirectPayouts.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		DirectPayouts.remove({ _id: id });
	}
});
