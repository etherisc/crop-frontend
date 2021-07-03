console.log('loading settings.js');


const settings = (key) => {
	const keyValue = Settings.findOne({key});
	return keyValue ? keyValue.value : null;
};

module.exports = { settings };