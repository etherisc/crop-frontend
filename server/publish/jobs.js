Meteor.publish("job_list", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Jobs.find({}, {});
	}
	return Jobs.find({createdBy:this.userId}, {});
});

Meteor.publish("jobs_null", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Jobs.find({_id:null}, {});
	}
	return Jobs.find({_id:null,createdBy:this.userId}, {});
});

Meteor.publish("job", function(jobId) {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Jobs.find({_id:jobId}, {});
	}
	return Jobs.find({_id:jobId,createdBy:this.userId}, {});
});

Meteor.publish("job_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Jobs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return Jobs.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("job_list_paged_count", function(extraOptions) {
	Counts.publish(this, "job_list_paged_count", Jobs.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"jobListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
			var data = Jobs.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Jobs.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

