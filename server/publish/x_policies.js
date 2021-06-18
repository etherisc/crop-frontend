Meteor.publish("policy_list", function() {
	return XPolicies.find({}, {});
});

Meteor.publish("policies_null", function() {
	return XPolicies.find({_id:null}, {});
});

Meteor.publish("policy", function(policyId) {
	return XPolicies.find({_id:policyId}, {});
});

Meteor.publish("partner_policies_list", function(mobile_num) {
	return XPolicies.find({mobile_num:mobile_num}, {});
});

Meteor.publish("policy_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return XPolicies.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("policy_list_paged_count", function(extraOptions) {
	Counts.publish(this, "policy_list_paged_count", XPolicies.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"policyListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = XPolicies.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});
