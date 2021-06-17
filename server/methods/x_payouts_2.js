Meteor.methods({
	"xPayouts2Insert": function(data) {
		if(!XPayouts2.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return XPayouts2.insert(data);
	},

	"xPayouts2Update": function(id, data) {
		var doc = XPayouts2.findOne({ _id: id });
		if(!XPayouts2.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XPayouts2.update({ _id: id }, { $set: data });
	},

	"xPayouts2Remove": function(id) {
		var doc = XPayouts2.findOne({ _id: id });
		if(!XPayouts2.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XPayouts2.remove({ _id: id });
	}
});
