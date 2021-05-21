Meteor.publish("payout_2_list", function() {
	return Payouts2.find({}, {});
});

Meteor.publish("payouts_2_null", function() {
	return Payouts2.find({_id:null}, {});
});

Meteor.publish("payout_2", function(payout2Id) {
	return Payouts2.find({_id:payout2Id}, {});
});

Meteor.publish("payout_2_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Payouts2.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("payout_2_list_paged_count", function(extraOptions) {
	Counts.publish(this, "payout_2_list_paged_count", Payouts2.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"payout2ListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Payouts2.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

