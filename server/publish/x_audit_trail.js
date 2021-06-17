Meteor.publish("audit_trail_list", function() {
	return XAuditTrail.find({}, {});
});

Meteor.publish("audit_trail_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return XAuditTrail.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("audit_trail_list_paged_count", function(extraOptions) {
	Counts.publish(this, "audit_trail_list_paged_count", XAuditTrail.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"auditTrailListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = XAuditTrail.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

