Meteor.publish("audit_trail_list", function() {
	return AuditTrail.find({}, {});
});

Meteor.publish("audit_trail_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return AuditTrail.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("audit_trail_list_paged_count", function(extraOptions) {
	Counts.publish(this, "audit_trail_list_paged_count", AuditTrail.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"auditTrailListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = AuditTrail.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

