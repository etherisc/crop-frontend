Meteor.publish("loglines_server", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Logs.find({source:"server"}, {sort:{timestamp:-1}});
	}
	return Logs.find({source:"server",createdBy:this.userId}, {sort:{timestamp:-1}});
});

Meteor.publish("loglines_browser", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Logs.find({source:"browser"}, {sort:{timestamp:-1}});
	}
	return Logs.find({source:"browser",createdBy:this.userId}, {sort:{timestamp:-1}});
});

Meteor.publish("logline", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Logs.find({}, {});
	}
	return Logs.find({createdBy:this.userId}, {});
});

Meteor.publish("loglines_browser_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Logs.find(databaseUtils.extendFilter({source:"browser"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
	}
	return Logs.find(databaseUtils.extendFilter({source:"browser",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
});

Meteor.publish("loglines_browser_paged_count", function(extraOptions) {
	Counts.publish(this, "loglines_browser_paged_count", Logs.find(databaseUtils.extendFilter({source:"browser",createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglinesBrowserPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
			var data = Logs.find(databaseUtils.extendFilter({source:"browser"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Logs.find(databaseUtils.extendFilter({source:"browser",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

Meteor.publish("loglines_server_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
	}
	return Logs.find(databaseUtils.extendFilter({source:"server",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
});

Meteor.publish("loglines_server_paged_count", function(extraOptions) {
	Counts.publish(this, "loglines_server_paged_count", Logs.find(databaseUtils.extendFilter({source:"server",createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglinesServerPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
			var data = Logs.find(databaseUtils.extendFilter({source:"server"}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Logs.find(databaseUtils.extendFilter({source:"server",createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

