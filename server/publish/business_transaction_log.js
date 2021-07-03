Meteor.publish("btx_line_list", function() {
	return BusinessTransactionLog.find({}, {sort:{timestamp:-1}});
});

Meteor.publish("btx_line", function(btxLineId) {
	return BusinessTransactionLog.find({_id:btxLineId}, {});
});

Meteor.publish("btx_line_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return BusinessTransactionLog.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
});

Meteor.publish("btx_line_list_paged_count", function(extraOptions) {
	Counts.publish(this, "btx_line_list_paged_count", BusinessTransactionLog.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"btxLineListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = BusinessTransactionLog.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

