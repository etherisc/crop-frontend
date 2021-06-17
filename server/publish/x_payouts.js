Meteor.publish("payout_list", function() {
	return XPayouts.find({}, {});
});

Meteor.publish("payouts_null", function() {
	return XPayouts.find({_id:null}, {});
});

Meteor.publish("payout", function(payoutId) {
	return XPayouts.find({_id:payoutId}, {});
});

Meteor.publish("filtered_payouts_list", function(order_number) {
	return XPayouts.find({order_number:order_number}, {});
});

Meteor.publish("payout_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return XPayouts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("payout_list_paged_count", function(extraOptions) {
	Counts.publish(this, "payout_list_paged_count", XPayouts.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"payoutListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = XPayouts.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

