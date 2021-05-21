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

Meteor.publish("partner_policies_list_paged", function(mobile_num, extraOptions) {
	extraOptions.doSkip = true;
	return Policies.find(databaseUtils.extendFilter({mobile_num:mobile_num}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("partner_policies_list_paged_count", function(mobile_num, extraOptions) {
	Counts.publish(this, "partner_policies_list_paged_count", Policies.find(databaseUtils.extendFilter({mobile_num:mobile_num}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"partnerPoliciesListPagedExport": function(mobile_num, extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Policies.find(databaseUtils.extendFilter({mobile_num:mobile_num}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
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

