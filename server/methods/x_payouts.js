Meteor.methods({
	"xPayoutsInsert": function(data) {
		if(!XPayouts.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return XPayouts.insert(data);
	},

	"xPayoutsUpdate": function(id, data) {
		var doc = XPayouts.findOne({ _id: id });
		if(!XPayouts.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XPayouts.update({ _id: id }, { $set: data });
	},

	"xPayoutsRemove": function(id) {
		var doc = XPayouts.findOne({ _id: id });
		if(!XPayouts.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XPayouts.remove({ _id: id });
	}
});
