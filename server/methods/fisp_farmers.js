Meteor.methods({
	"fispFarmersInsert": function(data) {
		if(!FispFarmers.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return FispFarmers.insert(data);
	},

	"fispFarmersUpdate": function(id, data) {
		var doc = FispFarmers.findOne({ _id: id });
		if(!FispFarmers.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		FispFarmers.update({ _id: id }, { $set: data });
	},

	"fispFarmersRemove": function(id) {
		var doc = FispFarmers.findOne({ _id: id });
		if(!FispFarmers.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		FispFarmers.remove({ _id: id });
	}
});
