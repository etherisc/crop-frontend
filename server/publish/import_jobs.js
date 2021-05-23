Meteor.publish("import_job_list", function() {
	return ImportJobs.find({}, {});
});

Meteor.publish("import_jobs_null", function() {
	return ImportJobs.find({_id:null}, {});
});

Meteor.publish("import_job", function(importJobId) {
	return ImportJobs.find({_id:importJobId}, {});
});

Meteor.publish("import_job_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return ImportJobs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("import_job_list_paged_count", function(extraOptions) {
	Counts.publish(this, "import_job_list_paged_count", ImportJobs.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"importJobListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = ImportJobs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

