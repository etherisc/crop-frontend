const countActivations = () => {

	activations = Activations.find({});
	var cursor = db.collection.find();

	while (activations.hasNext()) {
		// load only one document from the resultset into memory
		var activation = cursor.next();
		const count = Count.findOne({pixel: activation.pixel});
		if (count) {
			Count.update({pixel: activation.pixel}, {$set: {count: count.count + 1}});
		} else {
			Count.insert({pixel: activation.pixel, count: 1});
		}
	};
	
}; 

module.exports = { countActivations };