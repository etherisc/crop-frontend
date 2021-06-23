Meteor.publish("policy_list", function() {
	return Policies.find({}, {});
});

Meteor.publish("policies_null", function() {
	return Policies.find({_id:null}, {});
});

Meteor.publish("policy", function(policyId) {
	return Policies.find({_id:policyId}, {});
});

Meteor.publish("partner_policies_list", function(mobile_num) {
	return Policies.find({mobile_num:mobile_num}, {});
});

Meteor.publish("gp_individual_policies", function(gpId) {
	return Policies.find({group_policy_id:gpId}, {});
});

Meteor.publish("policy_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Policies.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("policy_list_paged_count", function(extraOptions) {
	Counts.publish(this, "policy_list_paged_count", Policies.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"policyListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Policies.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
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

