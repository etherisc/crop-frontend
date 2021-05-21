const countActivations = () => {

	activations = RecordCounts.find({}, {pixel: 1}).fetch();
	console.log(activations);

	activations.forEach((activation) => {
		const count = Count.findOne({pixel: activation.pixel});
		console.log(count);
		if (count) {
			Count.update({pixel: activation.pixel}, {$set: {count: count.count + 1}});
		} else {
			Count.insert({pixel: activation.pixel, count: 1});
		}
	});
	
}; 

module.exports = { countActivations };