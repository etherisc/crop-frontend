Meteor.publish("gp_individual_policies", function(gp_id) {
	return Policies.find({gp_id:gp_id}, {});
});

Meteor.publish("payout_schedule_entries_list", function(payoutScheduleId) {
	return Policies.find({payout_schedule_id:payoutScheduleId}, {});
});

Meteor.publish("policy_list", function() {
	return Policies.find({}, {});
});

Meteor.publish("policy", function(policyId) {
	return Policies.find({_id:policyId}, {});
});

Meteor.publish("payout_schedule_entries_list_paged", function(payoutScheduleId, extraOptions) {
	extraOptions.doSkip = true;
	return Policies.find(databaseUtils.extendFilter({payout_schedule_id:payoutScheduleId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("payout_schedule_entries_list_paged_count", function(payoutScheduleId, extraOptions) {
	Counts.publish(this, "payout_schedule_entries_list_paged_count", Policies.find(databaseUtils.extendFilter({payout_schedule_id:payoutScheduleId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"payoutScheduleEntriesListPagedExport": function(payoutScheduleId, extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Policies.find(databaseUtils.extendFilter({payout_schedule_id:payoutScheduleId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("gp_individual_policies_paged", function(gp_id, extraOptions) {
	extraOptions.doSkip = true;
	return Policies.find(databaseUtils.extendFilter({gp_id:gp_id}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("gp_individual_policies_paged_count", function(gp_id, extraOptions) {
	Counts.publish(this, "gp_individual_policies_paged_count", Policies.find(databaseUtils.extendFilter({gp_id:gp_id}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"gpIndividualPoliciesPagedExport": function(gp_id, extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Policies.find(databaseUtils.extendFilter({gp_id:gp_id}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

