Meteor.publish("count_list", function() {
	return RecordCounts.find({}, {});
});

