Meteor.publish("partner_list", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Partners.find({}, {});
	}
	return Partners.find({createdBy:this.userId}, {});
});

Meteor.publish("partners_null", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Partners.find({_id:null}, {});
	}
	return Partners.find({_id:null,createdBy:this.userId}, {});
});

Meteor.publish("partner", function(partnerId) {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Partners.find({_id:partnerId}, {});
	}
	return Partners.find({_id:partnerId,createdBy:this.userId}, {});
});

Meteor.publish("partner_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Partners.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return Partners.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("partner_list_paged_count", function(extraOptions) {
	Counts.publish(this, "partner_list_paged_count", Partners.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"partnerListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
			var data = Partners.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Partners.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

