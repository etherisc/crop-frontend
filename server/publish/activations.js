Meteor.publish("activation_list", function() {
	return Activations.find({}, {});
});

Meteor.publish("activations_null", function() {
	return Activations.find({_id:null}, {});
});

Meteor.publish("activation", function(activationId) {
	return Activations.find({_id:activationId}, {});
});

Meteor.publish("filtered_activations_list", function(mobile_num) {
	return Activations.find({mobile_num:mobile_num}, {});
});

Meteor.publish("activation_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Activations.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("activation_list_paged_count", function(extraOptions) {
	Counts.publish(this, "activation_list_paged_count", Activations.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"activationListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Activations.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

