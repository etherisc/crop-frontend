import { getMinioObject, putMinioObject } from '/imports/server/methods/minio.js';

const { get: levDistance } = require('fast-levenshtein');


const readLocationsFile = ({bucket, filename}, prefix) => {

	try {

		const act_content = getMinioObject(bucket, filename);

		const act_json = JSON.parse(act_content);

		Locations.remove({prefix});	

		let counter = 0;
		act_json.forEach(item => {

			counter += 1;

			let { 
				COUNTY_NAM,
				ycoord,
				xcoord,
				Latitude,
				Longitude,
				NewPixel,
				County_ward,
				WARD
			} = item; 

			const county = COUNTY_NAM;
			const ward = WARD;
			const county_ward = County_ward;
			const pixel = NewPixel;
			const latitude = Latitude;
			const longitude = Longitude;
			const source = `${bucket}/${filename}`;

			const result = Locations.upsert(
				{ prefix, county_ward },
				{ 
					$set: {
						source,
						county,
						ward,
						county_ward,
						latitude,
						longitude,
						pixel,
						xcoord,
						ycoord,
						prefix					
					}
				}
			);

		});

		info('readLocations successful', {
			act_content: act_content.slice(0,80),
			counter
		});

		return `${counter} locations imported.`;

	} catch (e) {
		throw new Meteor.Error('Error', e.message, e.stack);
	}
};


const normalizeCountyWard = (county, ward) => {

	return (
		`${county}#${ward}`
		.toUpperCase()				// Convert to upper case
		.replace(/[^\w#]/g, ' ')	// Replace non-word (except for '#') by space
		.replace(/\s+/g, ' ')		// Reduce multiple whitespace by single space
	);

}


const augmentLocations = () => {

	const ZERO = 'Pixel401201';
	const levenstheinCutoff = 3; // give it a try

	let noLocation = 0;
	let notUnique = 0;
	let phoneFound = 0;

	const locs = Locations
	.find({})
	.fetch()
	.map(({pixel, county, ward, latitude, longitude}) => {
		return ({pixel, cwNorm: normalizeCountyWard(county, ward), county, ward, latitude, longitude});
	});

	const candidates = (cty, wrd) => {

		let result = [];
		let countyUnique = false;
		let cwNorm = normalizeCountyWard(cty, wrd);
		let foundOne = false;

		locs.forEach(loc => {
			if (foundOne) return;
			const dist = levDistance(cwNorm, loc.cwNorm);
			countyUnique = levDistance(normalizeCountyWard(cty, ''), normalizeCountyWard(loc.county, ''));
			const res = {
				dist, 
				cwNorm: loc.cwNorm,
				pixel: loc.pixel,
				latitude: loc.latitude,
				longitude: loc.longitude, 
				county: loc.county,
				ward: loc.ward
			};

			if (dist === 0) {
				result = [res];
				foundOne = true;
			} else if (dist < levenstheinCutoff) {
				result.push(res);
			}

		});

		info(`Candidates for ${cwNorm}: ${result.length}, CountyUnique: ${countyUnique}`, {result, countyUnique});

		return { countyUnique, result };

	};


	const activations = Activations.find({pixel: ZERO});

	activations.forEach(item => {
		if (!item.county || !item.ward || normalizeCountyWard(item.county, item.ward) === '#') {
			noLocation += 1;
		} else {
			const {result, countyUnique } = candidates(item.county, item.ward); 
			if (result.length === 1) {
				const {pixel, longitude, latitude, county, ward} = result[0];
				const augmented = 'loc';
				Activations.update({_id: item._id}, { $set: {	pixel, latitude, longitude, county, ward, augmented }});
				info(`Activation updated based on county/ward: ${pixel}`);
			} else {
				notUnique += 1;
				if (countyUnique) {
					const augmented = `Candidates: ${result.join('; ')}`; 
					Activations.update({_id: item._id}, { $set: { augmented }});
					info(`Activation updated, candidates found`, result);			
				}

			}
		}

		// Now try to find other activations with same phone number:

		const phoneCand = Activations.find({mobile_num: item.mobile_num});
		let stop = false;
		phoneCand.forEach(phoneItem => {

			if (stop) {
				info('still running...');
				return false;
			}

			if (phoneItem.pixel !== ZERO) {
				const { pixel, latitude, longitude, county, ward } = phoneItem;
				augmented = 'phone';
				Activations.update({_id: item._id}, { $set: {	pixel, latitude, longitude, county, ward, augmented }});
				info(`Activation updated based on other record with same mobile_num: ${item.mobile_num} => ${pixel}`);
				phoneFound += 1;
				stop = true;
				return false;
			}

		});


	});

	return (`Activations without Location: ${noLocation}; not unique: ${notUnique}; phone-based update: ${phoneFound}`);

};


module.exports = { readLocationsFile, augmentLocations };

