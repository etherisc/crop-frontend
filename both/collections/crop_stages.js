this.CropStages = new Mongo.Collection("crop_stages");

this.CropStages.userCanInsert = function(userId, doc) {
	return true;
};

this.CropStages.userCanUpdate = function(userId, doc) {
	return true;
};

this.CropStages.userCanRemove = function(userId, doc) {
	return true;
};
