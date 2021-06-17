Meteor.methods({
	"xArc2DataInsert": function(data) {
		if(!XArc2Data.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return XArc2Data.insert(data);
	},

	"xArc2DataUpdate": function(id, data) {
		var doc = XArc2Data.findOne({ _id: id });
		if(!XArc2Data.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XArc2Data.update({ _id: id }, { $set: data });
	},

	"xArc2DataRemove": function(id) {
		var doc = XArc2Data.findOne({ _id: id });
		if(!XArc2Data.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XArc2Data.remove({ _id: id });
	}
});
