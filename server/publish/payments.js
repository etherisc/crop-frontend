Meteor.publish("payment_list", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Payments.find({}, {});
	}
	return Payments.find({createdBy:this.userId}, {});
});

Meteor.publish("payments_null", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Payments.find({_id:null}, {});
	}
	return Payments.find({_id:null,createdBy:this.userId}, {});
});

Meteor.publish("payment", function(paymentId) {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Payments.find({_id:paymentId}, {});
	}
	return Payments.find({_id:paymentId,createdBy:this.userId}, {});
});

Meteor.publish("payment_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Payments.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
	}
	return Payments.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("payment_list_paged_count", function(extraOptions) {
	Counts.publish(this, "payment_list_paged_count", Payments.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"paymentListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
			var data = Payments.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
			return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
		}
		var data = Payments.find(databaseUtils.extendFilter({createdBy:this.userId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

