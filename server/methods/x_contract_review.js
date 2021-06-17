Meteor.methods({
	"xContractReviewInsert": function(data) {
		if(!XContractReview.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return XContractReview.insert(data);
	},

	"xContractReviewUpdate": function(id, data) {
		var doc = XContractReview.findOne({ _id: id });
		if(!XContractReview.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XContractReview.update({ _id: id }, { $set: data });
	},

	"xContractReviewRemove": function(id) {
		var doc = XContractReview.findOne({ _id: id });
		if(!XContractReview.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		XContractReview.remove({ _id: id });
	}
});
