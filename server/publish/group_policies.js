Meteor.publish("group_policy_list", function() {
	return GroupPolicies.find({}, {sort:{location:1}});
});

Meteor.publish("group_policy", function(groupPolicyId) {
	return GroupPolicies.find({_id:groupPolicyId}, {});
});

Meteor.publish("group_policy_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return GroupPolicies.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{location:1}}, extraOptions));
});

Meteor.publish("group_policy_list_paged_count", function(extraOptions) {
	Counts.publish(this, "group_policy_list_paged_count", GroupPolicies.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"groupPolicyListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = GroupPolicies.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{location:1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

