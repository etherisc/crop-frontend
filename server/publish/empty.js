Meteor.publish("empty", function() {
	return Empty.find({}, {});
});

Meteor.publish("empty_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Empty.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("empty_paged_count", function(extraOptions) {
	Counts.publish(this, "empty_paged_count", Empty.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"emptyPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Empty.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

