Meteor.publish("gp_individual_policies", function() {
	return Policies.find({}, {});
});

Meteor.publish("policy_list", function() {
	return Policies.find({}, {});
});

Meteor.publish("policy", function(groupPolicyId) {
	return Policies.find({id:groupPolicyId}, {});
});

Meteor.publish("gp_individual_policies_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Policies.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("gp_individual_policies_paged_count", function(extraOptions) {
	Counts.publish(this, "gp_individual_policies_paged_count", Policies.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"gpIndividualPoliciesPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Policies.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

