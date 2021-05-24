Meteor.publish("loglines_server", function() {
	return Logs.find({source:"server"}, {sort:{timestamp:-1}});
});

Meteor.publish("loglines_browser", function() {
	return Logs.find({source:"browser"}, {sort:{timestamp:-1}});
});

Meteor.publish("logline", function() {
	return Logs.find({}, {});
});

Meteor.publish("loglines_browser_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Logs.find(databaseUtils.extendFilter({source:"browser"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
});

Meteor.publish("loglines_browser_paged_count", function(extraOptions) {
	Counts.publish(this, "loglines_browser_paged_count", Logs.find(databaseUtils.extendFilter({source:"browser"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglinesBrowserPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Logs.find(databaseUtils.extendFilter({source:"browser"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("loglines_server_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
});

Meteor.publish("loglines_server_paged_count", function(extraOptions) {
	Counts.publish(this, "loglines_server_paged_count", Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglinesServerPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

