Meteor.publish("notification_list", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Notifications.find({}, {});
	}
	return Notifications.find({createdBy:this.userId}, {});
});

Meteor.publish("notifications_null", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Notifications.find({_id:null}, {});
	}
	return Notifications.find({_id:null,createdBy:this.userId}, {});
});

Meteor.publish("notification", function(notificationId) {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Notifications.find({_id:notificationId}, {});
	}
	return Notifications.find({_id:notificationId,createdBy:this.userId}, {});
});

Meteor.publish("notification_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Notifications.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return Notifications.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("notification_list_paged_count", function(extraOptions) {
	Counts.publish(this, "notification_list_paged_count", Notifications.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"notificationListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
			var data = Notifications.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Notifications.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

