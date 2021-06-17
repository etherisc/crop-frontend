Meteor.publish("contract_review_list", function() {
	return XContractReview.find({}, {});
});

Meteor.publish("contract_review_detail", function(contractReviewId) {
	return XContractReview.find({_id:contractReviewId}, {});
});

Meteor.publish("contract_review_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return XContractReview.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("contract_review_list_paged_count", function(extraOptions) {
	Counts.publish(this, "contract_review_list_paged_count", XContractReview.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"contractReviewListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = XContractReview.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

