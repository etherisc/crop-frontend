Meteor.publish("users_null", function() {
	if(Users.isInRoles(this.userId, ["admin","blocked","user"])) {
		return Users.find({_id:null}, {});
	}
	return Users.find({_id:null,createdBy:this.userId}, {});
});

