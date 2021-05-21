Meteor.methods({
	"contractReviewInsert": function(data) {
		if(!ContractReview.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return ContractReview.insert(data);
	},

	"contractReviewUpdate": function(id, data) {
		var doc = ContractReview.findOne({ _id: id });
		if(!ContractReview.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		ContractReview.update({ _id: id }, { $set: data });
	},

	"contractReviewRemove": function(id) {
		var doc = ContractReview.findOne({ _id: id });
		if(!ContractReview.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		ContractReview.remove({ _id: id });
	}
});
