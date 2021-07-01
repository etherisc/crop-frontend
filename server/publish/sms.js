Meteor.publish("logline_sms_list", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Sms.find({}, {sort:{timestamp:-1}});
	}
	return Sms.find({createdBy:this.userId}, {sort:{timestamp:-1}});
});

Meteor.publish("logline_sms", function(loglineSmsId) {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Sms.find({_id:loglineSmsId}, {sort:{timestamp:-1}});
	}
	return Sms.find({_id:loglineSmsId,createdBy:this.userId}, {sort:{timestamp:-1}});
});

Meteor.publish("logline_sms_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Sms.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
	}
	return Sms.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions));
});

Meteor.publish("logline_sms_list_paged_count", function(extraOptions) {
	Counts.publish(this, "logline_sms_list_paged_count", Sms.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"loglineSmsListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
			var data = Sms.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Sms.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({sort:{timestamp:-1}}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

