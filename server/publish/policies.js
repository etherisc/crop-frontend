Meteor.publish("gp_individual_policies", function(gpId) {
	return Policies.find({group_policy_id:gpId}, {});
});

Meteor.publish("policy_list", function() {
	return Policies.find({}, {});
});

Meteor.publish("gp_individual_policies_paged", function(gpId, extraOptions) {
	extraOptions.doSkip = true;
	return Policies.find(databaseUtils.extendFilter({group_policy_id:gpId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("gp_individual_policies_paged_count", function(gpId, extraOptions) {
	Counts.publish(this, "gp_individual_policies_paged_count", Policies.find(databaseUtils.extendFilter({group_policy_id:gpId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"gpIndividualPoliciesPagedExport": function(gpId, extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Policies.find(databaseUtils.extendFilter({group_policy_id:gpId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

