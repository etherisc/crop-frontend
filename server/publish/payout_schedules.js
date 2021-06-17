Meteor.publish("payout_schedule_list", function() {
	return PayoutSchedules.find({}, {});
});

Meteor.publish("payout_schedules_null", function() {
	return PayoutSchedules.find({_id:null}, {});
});

Meteor.publish("payout_schedule", function(payoutScheduleId) {
	return PayoutSchedules.find({_id:payoutScheduleId}, {});
});

Meteor.publish("payout_schedule_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return PayoutSchedules.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("payout_schedule_list_paged_count", function(extraOptions) {
	Counts.publish(this, "payout_schedule_list_paged_count", PayoutSchedules.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"payoutScheduleListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = PayoutSchedules.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

