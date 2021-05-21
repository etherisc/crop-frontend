Meteor.methods({
	"paymentsInsert": function(data) {
		if(!Payments.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Payments.insert(data);
	},

	"paymentsUpdate": function(id, data) {
		var doc = Payments.findOne({ _id: id });
		if(!Payments.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Payments.update({ _id: id }, { $set: data });
	},

	"paymentsRemove": function(id) {
		var doc = Payments.findOne({ _id: id });
		if(!Payments.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Payments.remove({ _id: id });
	}
});
