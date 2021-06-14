Meteor.methods({
	"notificationsInsert": function(data) {
		if(!Notifications.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Notifications.insert(data);
	},

	"notificationsUpdate": function(id, data) {
		var doc = Notifications.findOne({ _id: id });
		if(!Notifications.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Notifications.update({ _id: id }, { $set: data });
	},

	"notificationsRemove": function(id) {
		var doc = Notifications.findOne({ _id: id });
		if(!Notifications.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Notifications.remove({ _id: id });
	}
});
