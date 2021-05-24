Meteor.publish("loglines_server", function() {
	return Logs.find({source:"server"}, {});
});

Meteor.publish("loglines_browser", function() {
	return Logs.find({source:"browser"}, {});
});

Meteor.publish("logline", function() {
	return Logs.find({}, {});
});

Meteor.publish("logline_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Logs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("logline_paged_count", function(extraOptions) {
	Counts.publish(this, "logline_paged_count", Logs.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglinePagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Logs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("loglines_server_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("loglines_server_paged_count", function(extraOptions) {
	Counts.publish(this, "loglines_server_paged_count", Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglinesServerPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("loglines_server_find_one", function() {
	return Logs.find({source:"server"}, {});
});

