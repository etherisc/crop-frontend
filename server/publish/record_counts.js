Meteor.publish("record_count_list", function() {
	return RecordCounts.find({}, {});
});

