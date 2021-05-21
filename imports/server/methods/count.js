const countActivations = () => {

	activation = Activations.find({});

	activations.forEach((activation) => {
		const count = RecordCounts.findOne({pixel: activation.pixel});
		console.log(count);
		if (count) {
			RecordCounts.update({pixel: activation.pixel}, {$set: {count: count.count + 1}});
		} else {
			RecordCounts.insert({pixel: activation.pixel, count: 1});
		}
	});
	
}; 

module.exports = { countActivations };