Meteor.publish("logline_sms_list", function() {
	return Sms.find({}, {});
});

Meteor.publish("logline_sms", function(loglineSmsId) {
	return Sms.find({_id:loglineSmsId}, {});
});

Meteor.publish("logline_sms_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Sms.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("logline_sms_list_paged_count", function(extraOptions) {
	Counts.publish(this, "logline_sms_list_paged_count", Sms.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglineSmsListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Sms.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

