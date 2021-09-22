this.FispFarmers = new Mongo.Collection("fisp_farmers");

this.FispFarmers.userCanInsert = function(userId, doc) {
	return true;
};

this.FispFarmers.userCanUpdate = function(userId, doc) {
	return true;
};

this.FispFarmers.userCanRemove = function(userId, doc) {
	return true;
};
