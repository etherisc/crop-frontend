Meteor.publish("site_table_view", function() {
	return XArc2Data.find({}, {});
});

Meteor.publish("arc2row_list", function() {
	return XArc2Data.find({}, {});
});

Meteor.publish("arc2row", function(arc2rowId) {
	return XArc2Data.find({_id:arc2rowId}, {});
});

Meteor.publish("arc2row_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return XArc2Data.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("arc2row_list_paged_count", function(extraOptions) {
	Counts.publish(this, "arc2row_list_paged_count", XArc2Data.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"arc2rowListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = XArc2Data.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

