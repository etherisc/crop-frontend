Meteor.methods({
	"payouts2Insert": function(data) {
		if(!Payouts2.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Payouts2.insert(data);
	},

	"payouts2Update": function(id, data) {
		var doc = Payouts2.findOne({ _id: id });
		if(!Payouts2.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Payouts2.update({ _id: id }, { $set: data });
	},

	"payouts2Remove": function(id) {
		var doc = Payouts2.findOne({ _id: id });
		if(!Payouts2.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Payouts2.remove({ _id: id });
	}
});
