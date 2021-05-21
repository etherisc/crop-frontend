Meteor.publish("payment_list", function() {
	return Payments.find({}, {});
});

Meteor.publish("payments_null", function() {
	return Payments.find({_id:null}, {});
});

Meteor.publish("payment", function(paymentId) {
	return Payments.find({_id:paymentId}, {});
});

Meteor.publish("filtered_payments_list", function(mobile_num) {
	return Payments.find({mobile_num:mobile_num}, {});
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

Meteor.publish("filtered_payments_list_paged", function(mobile_num, extraOptions) {
	extraOptions.doSkip = true;
	return Payments.find(databaseUtils.extendFilter({mobile_num:mobile_num}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("filtered_payments_list_paged_count", function(mobile_num, extraOptions) {
	Counts.publish(this, "filtered_payments_list_paged_count", Payments.find(databaseUtils.extendFilter({mobile_num:mobile_num}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"filteredPaymentsListPagedExport": function(mobile_num, extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Payments.find(databaseUtils.extendFilter({mobile_num:mobile_num}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

