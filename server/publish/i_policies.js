Meteor.publish("gp_individual_policies", function(groupPolicyId) {
	return IPolicies.find({gp_mongo_id:groupPolicyId}, {});
});

Meteor.publish("gp_individual_policies_paged", function(groupPolicyId, extraOptions) {
	extraOptions.doSkip = true;
	return IPolicies.find(databaseUtils.extendFilter({gp_mongo_id:groupPolicyId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("gp_individual_policies_paged_count", function(groupPolicyId, extraOptions) {
	Counts.publish(this, "gp_individual_policies_paged_count", IPolicies.find(databaseUtils.extendFilter({gp_mongo_id:groupPolicyId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"gpIndividualPoliciesPagedExport": function(groupPolicyId, extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = IPolicies.find(databaseUtils.extendFilter({gp_mongo_id:groupPolicyId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

