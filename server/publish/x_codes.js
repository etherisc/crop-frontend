Meteor.publish("code_list", function() {
	return XCodes.find({}, {});
});

Meteor.publish("codes_null", function() {
	return XCodes.find({_id:null}, {});
});

Meteor.publish("code", function(codeId) {
	return XCodes.find({_id:codeId}, {});
});

Meteor.publish("code_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return XCodes.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("code_list_paged_count", function(extraOptions) {
	Counts.publish(this, "code_list_paged_count", XCodes.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"codeListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = XCodes.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

