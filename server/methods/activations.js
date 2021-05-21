Meteor.methods({
	"activationsInsert": function(data) {
		if(!Activations.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Activations.insert(data);
	},

	"activationsUpdate": function(id, data) {
		var doc = Activations.findOne({ _id: id });
		if(!Activations.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Activations.update({ _id: id }, { $set: data });
	},

	"activationsRemove": function(id) {
		var doc = Activations.findOne({ _id: id });
		if(!Activations.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Activations.remove({ _id: id });
	}
});
