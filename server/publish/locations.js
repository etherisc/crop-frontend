Meteor.publish("location_list", function() {
	return Locations.find({}, {});
});

Meteor.publish("locations_null", function() {
	return Locations.find({_id:null}, {});
});

Meteor.publish("location", function(locationId) {
	return Locations.find({_id:locationId}, {});
});

Meteor.publish("location_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return Locations.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("location_list_paged_count", function(extraOptions) {
	Counts.publish(this, "location_list_paged_count", Locations.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"locationListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = Locations.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

