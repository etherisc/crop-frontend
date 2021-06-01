Meteor.publish("job_list", function() {
	return Jobs.find({}, {});
});

Meteor.publish("jobs_null", function() {
	return Jobs.find({_id:null}, {});
});

Meteor.publish("job", function(jobId) {
	return Jobs.find({_id:jobId}, {});
});

Meteor.publish("job_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Jobs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("job_list_paged_count", function(extraOptions) {
	Counts.publish(this, "job_list_paged_count", Jobs.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"jobListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Jobs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

