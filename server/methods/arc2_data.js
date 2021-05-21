Meteor.methods({
	"arc2DataInsert": function(data) {
		if(!Arc2Data.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Arc2Data.insert(data);
	},

	"arc2DataUpdate": function(id, data) {
		var doc = Arc2Data.findOne({ _id: id });
		if(!Arc2Data.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Arc2Data.update({ _id: id }, { $set: data });
	},

	"arc2DataRemove": function(id) {
		var doc = Arc2Data.findOne({ _id: id });
		if(!Arc2Data.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Arc2Data.remove({ _id: id });
	}
});
