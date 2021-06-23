Meteor.publish("gp_individual_policies", function(gpId) {
	return IPolicies.find({group_policy_id:gpId}, {});
});

Meteor.publish("payout_schedule_entries_list", function(payoutScheduleId) {
	return IPolicies.find({payout_schedule_id:payoutScheduleId}, {});
});

Meteor.publish("i_policy_list", function() {
	return IPolicies.find({}, {});
});

Meteor.publish("i_policy", function(iPolicyId) {
	return IPolicies.find({_id:iPolicyId}, {});
});

Meteor.publish("i_policy_list1", function() {
	return IPolicies.find({}, {});
});

Meteor.publish("i_policy1", function(iPolicyId) {
	return IPolicies.find({_id:iPolicyId}, {});
});

Meteor.publish("payout_schedule_entries_list_paged", function(payoutScheduleId, extraOptions) {
	extraOptions.doSkip = true;
	return IPolicies.find(databaseUtils.extendFilter({payout_schedule_id:payoutScheduleId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("payout_schedule_entries_list_paged_count", function(payoutScheduleId, extraOptions) {
	Counts.publish(this, "payout_schedule_entries_list_paged_count", IPolicies.find(databaseUtils.extendFilter({payout_schedule_id:payoutScheduleId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"payoutScheduleEntriesListPagedExport": function(payoutScheduleId, extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = IPolicies.find(databaseUtils.extendFilter({payout_schedule_id:payoutScheduleId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("gp_individual_policies_paged", function(gpId, extraOptions) {
	extraOptions.doSkip = true;
	return IPolicies.find(databaseUtils.extendFilter({group_policy_id:gpId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("gp_individual_policies_paged_count", function(gpId, extraOptions) {
	Counts.publish(this, "gp_individual_policies_paged_count", IPolicies.find(databaseUtils.extendFilter({group_policy_id:gpId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"gpIndividualPoliciesPagedExport": function(gpId, extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = IPolicies.find(databaseUtils.extendFilter({group_policy_id:gpId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

