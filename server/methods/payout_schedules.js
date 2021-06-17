Meteor.methods({
	"payoutSchedulesInsert": function(data) {
		if(!PayoutSchedules.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return PayoutSchedules.insert(data);
	},

	"payoutSchedulesUpdate": function(id, data) {
		var doc = PayoutSchedules.findOne({ _id: id });
		if(!PayoutSchedules.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		PayoutSchedules.update({ _id: id }, { $set: data });
	},

	"payoutSchedulesRemove": function(id) {
		var doc = PayoutSchedules.findOne({ _id: id });
		if(!PayoutSchedules.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		PayoutSchedules.remove({ _id: id });
	}
});
