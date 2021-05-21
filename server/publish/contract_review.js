Meteor.publish("contract_review_list", function() {
	return ContractReview.find({}, {});
});

Meteor.publish("contract_review_detail", function(contractReviewId) {
	return ContractReview.find({_id:contractReviewId}, {});
});

Meteor.publish("contract_review_list_paged", function(extraOptions) {
	extraOptions.doSkip = true;
	return ContractReview.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions));
});

Meteor.publish("contract_review_list_paged_count", function(extraOptions) {
	Counts.publish(this, "contract_review_list_paged_count", ContractReview.find(databaseUtils.extendFilter({}, extraOptions), { fields: { _id: 1 } }));
});

Meteor.methods({
	"contractReviewListPagedExport": function(extraOptions, exportFields, fileType) {
		extraOptions.noPaging = true;
		var data = ContractReview.find(databaseUtils.extendFilter({}, extraOptions), databaseUtils.extendOptions({}, extraOptions)).fetch();
		return objectUtils.exportArrayOfObjects(data, exportFields, fileType);
	}
});

