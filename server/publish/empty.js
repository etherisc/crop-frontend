Meteor.publish("empty", function() {
	return Empty.find({}, {});
});

