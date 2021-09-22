Meteor.publish("fisp_farmer_list", function() {
	return FispFarmers.find({}, {});
});

Meteor.publish("fisp_farmer", function(fispFarmerId) {
	return FispFarmers.find({_id:fispFarmerId}, {});
});

Meteor.publish("fisp_farmer_list1", function() {
	return FispFarmers.find({}, {});
});

Meteor.publish("fisp_farmers_null", function() {
	return FispFarmers.find({_id:null}, {});
});

Meteor.publish("fisp_farmer1", function(fispFarmerId) {
	return FispFarmers.find({_id:fispFarmerId}, {});
});

Meteor.publish("fisp_farmer_list1_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return FispFarmers.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("fisp_farmer_list1_paged_count", function(extraOptions) {
	Counts.publish(this, "fisp_farmer_list1_paged_count", FispFarmers.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"fispFarmerList1PagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = FispFarmers.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

