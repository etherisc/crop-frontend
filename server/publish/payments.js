Meteor.publish("payment_list", function() {
	return Payments.find({}, {});
});

Meteor.publish("payments_null", function() {
	return Payments.find({_id:null}, {});
});

Meteor.publish("payment", function(paymentId) {
	return Payments.find({_id:paymentId}, {});
});

Meteor.publish("payment_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Payments.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("payment_list_paged_count", function(extraOptions) {
	Counts.publish(this, "payment_list_paged_count", Payments.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"paymentListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Payments.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

