Meteor.methods({
	"smsInsert": function(data) {
		if(!Sms.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Sms.insert(data);
	},

	"smsUpdate": function(id, data) {
		var doc = Sms.findOne({ _id: id });
		if(!Sms.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Sms.update({ _id: id }, { $set: data });
	},

	"smsRemove": function(id) {
		var doc = Sms.findOne({ _id: id });
		if(!Sms.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Sms.remove({ _id: id });
	}
});
