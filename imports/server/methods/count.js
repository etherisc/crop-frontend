const countActivations = () => {

	RecordCounts.remove({});
	activations = Activations.find({});

	activations.forEach((activation) => {
		
		const newPixel = latLng2PixelStr(activation.latitude, activation.longitude);
		Activations.update({_id: activation._id}, {$set: {pixel: newPixel}});
		
		const count = RecordCounts.findOne({pixel: newPixel});
		console.log(count);
		if (count) {
			RecordCounts.update({pixel: newPixel}, {$set: {count: count.count + 1}});
		} else {
			RecordCounts.insert({pixel: newPixel, count: 1});
		}
	});
	
}; 

module.exports = { countActivations };