Meteor.publish("gp_crop_stages_list", function(groupPolicyId) {
	return CropStages.find({gp_mongo_id:groupPolicyId}, {});
});

Meteor.publish("gp_crop_stages_list_paged", function(groupPolicyId, extraOptions) {
	extraOptions.doSkip = true;
	return CropStages.find(databaseUtils.extendFilter({gp_mongo_id:groupPolicyId}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("gp_crop_stages_list_paged_count", function(groupPolicyId, extraOptions) {
	Counts.publish(this, "gp_crop_stages_list_paged_count", CropStages.find(databaseUtils.extendFilter({gp_mongo_id:groupPolicyId}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"gpCropStagesListPagedExport": function(groupPolicyId, extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = CropStages.find(databaseUtils.extendFilter({gp_mongo_id:groupPolicyId}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

