Meteor.publish("notification_list", function() {
	return Notifications.find({}, {});
});

Meteor.publish("notifications_null", function() {
	return Notifications.find({_id:null}, {});
});

Meteor.publish("notification", function(notificationId) {
	return Notifications.find({_id:notificationId}, {});
});

Meteor.publish("notification_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Notifications.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("notification_list_paged_count", function(extraOptions) {
	Counts.publish(this, "notification_list_paged_count", Notifications.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"notificationListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Notifications.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

