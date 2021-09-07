Meteor.publish("direct_payout_list", function() {
	return DirectPayouts.find({}, {});
});

Meteor.publish("direct_payout_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return DirectPayouts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("direct_payout_list_paged_count", function(extraOptions) {
	Counts.publish(this, "direct_payout_list_paged_count", DirectPayouts.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"directPayoutListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = DirectPayouts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

