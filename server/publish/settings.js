Meteor.publish("setting_list", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Settings.find({}, {});
	}
	return Settings.find({createdBy:this.userId}, {});
});

Meteor.publish("settings_null", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Settings.find({_id:null}, {});
	}
	return Settings.find({_id:null,createdBy:this.userId}, {});
});

Meteor.publish("setting", function(settingId) {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Settings.find({_id:settingId}, {});
	}
	return Settings.find({_id:settingId,createdBy:this.userId}, {});
});

Meteor.publish("setting_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Settings.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return Settings.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("setting_list_paged_count", function(extraOptions) {
	Counts.publish(this, "setting_list_paged_count", Settings.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"settingListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
			var data = Settings.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Settings.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

