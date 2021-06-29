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

