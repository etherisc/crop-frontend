Meteor.methods({
	"xCodesInsert": function(data) {
		if(!XCodes.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return XCodes.insert(data);
	},

	"xCodesUpdate": function(id, data) {
		var doc = XCodes.findOne({ _id: id });
		if(!XCodes.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XCodes.update({ _id: id }, { $set: data });
	},

	"xCodesRemove": function(id) {
		var doc = XCodes.findOne({ _id: id });
		if(!XCodes.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XCodes.remove({ _id: id });
	}
});
