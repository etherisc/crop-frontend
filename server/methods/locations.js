Meteor.methods({
	"locationsInsert": function(data) {
		if(!Locations.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Locations.insert(data);
	},

	"locationsUpdate": function(id, data) {
		var doc = Locations.findOne({ _id: id });
		if(!Locations.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Locations.update({ _id: id }, { $set: data });
	},

	"locationsRemove": function(id) {
		var doc = Locations.findOne({ _id: id });
		if(!Locations.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Locations.remove({ _id: id });
	}
});
