Meteor.publish("count_list", function() {
	return Counts.find({}, {});
});

