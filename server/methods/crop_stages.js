Meteor.methods({
	"cropStagesInsert": function(data) {
		if(!CropStages.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return CropStages.insert(data);
	},

	"cropStagesUpdate": function(id, data) {
		var doc = CropStages.findOne({ _id: id });
		if(!CropStages.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		CropStages.update({ _id: id }, { $set: data });
	},

	"cropStagesRemove": function(id) {
		var doc = CropStages.findOne({ _id: id });
		if(!CropStages.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		CropStages.remove({ _id: id });
	}
});
