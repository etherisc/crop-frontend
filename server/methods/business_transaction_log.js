Meteor.methods({
	"businessTransactionLogInsert": function(data) {
		if(!BusinessTransactionLog.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return BusinessTransactionLog.insert(data);
	},

	"businessTransactionLogUpdate": function(id, data) {
		var doc = BusinessTransactionLog.findOne({ _id: id });
		if(!BusinessTransactionLog.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		BusinessTransactionLog.update({ _id: id }, { $set: data });
	},

	"businessTransactionLogRemove": function(id) {
		var doc = BusinessTransactionLog.findOne({ _id: id });
		if(!BusinessTransactionLog.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		BusinessTransactionLog.remove({ _id: id });
	}
});
