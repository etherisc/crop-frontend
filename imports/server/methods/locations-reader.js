import { getMinioObject, putMinioObject } from '/imports/server/methods/minio.js';

const { get: levDistance } = require('fast-levenshtein');



const normalize = (text) => {

	return (
		text
		.toUpperCase()				// Convert to upper case
		.replace(/\W/g, ' ')	    // Replace non-word (except for '#') by space
		.replace(/\s+/g, ' ')		// Reduce multiple whitespace by single space
	);

}

const readSiteTableLocations = ({bucket, filename}) => {

	const act_content = getMinioObject(bucket, filename);

	const act_json = JSON.parse(act_content);

	act_json.forEach(item => {
		Locations.upsert({pixel: item.pixel}, {$set: {site_table_exists: true}});
	});

	const msg = `Site Table Locations updated, count: ${act_json.length}`;
	
	info(msg);
	return(msg);

};


const readLocationsFile = ({bucket, filename, prefix}) => {

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

			const county = normalize(COUNTY_NAM);
			const ward = normalize(WARD);
			const county_ward = normalize(County_ward);
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


const augmentLocations = () => {

	const ZERO = 'Pixel401201';
	const levenshteinCutoffCounty = 3; // give it a try
	const levenshteinCutoffWard = 6; // give it a try

	let noLocation = 0;
	let notUnique = 0;
	let phoneFound = 0;

	const locs = Locations
	.find({})
	.fetch()
	.map(({pixel, county, ward, latitude, longitude}) => {
		return ({pixel, cNorm: normalize(county), wNorm: normalize(ward), county, ward, latitude, longitude});
	});

	const candidates = (cty, wrd) => {

		let result = [];
		let countyUnique = false;
		let cNorm = normalize(cty);
		let wNorm = normalize(wrd);
		let foundOne = false;

		locs.forEach(loc => {
			if (foundOne) return;
			const cDist = levDistance(cNorm, loc.cNorm);
			const wDist = levDistance(wNorm, loc.wNorm);
			countyUnique = countyUnique || cDist === 0;
			const res = {
				cDist,
				wDist,
				cNorm: loc.cNorm,
				wNorm: loc.wNorm,
				pixel: loc.pixel,
				latitude: loc.latitude,
				longitude: loc.longitude, 
				county: loc.county,
				ward: loc.ward
			};

			if (cDist === 0 && wDist === 0) {
				result = [res];
				foundOne = true;
			} else if (cDist < levenshteinCutoffCounty && wDist < levenshteinCutoffWard) {
				result.push(res);
			}

		});

		if (result.length > 0) {
			info(`Candidates for ${cNorm}/${wNorm}: ${result.length}, CountyUnique: ${countyUnique}`, {result, countyUnique});
		}

		return { countyUnique, result };

	};


	const activations = Activations.find({pixel: ZERO});

	activations.forEach(item => {

		// First try to find other activations with same phone number:

		const phoneCand = Activations.find({mobile_num: item.mobile_num, pixel: {$ne: ZERO}});
		let found = false;

		phoneCand.forEach(phoneItem => {

			if (found) return;

			const { pixel, latitude, longitude, county, ward } = phoneItem;
			augmented = 'phone-based';
			Activations.update({_id: item._id}, { $set: {	pixel, latitude, longitude, county, ward, augmented }});
			info(`Activation updated based on other record with same mobile_num: ${item.mobile_num} => ${pixel}`);
			phoneFound += 1;
			found = true;

		});

		if (found) return;

		if (!item.county || !item.ward || normalize(`${item.county}${item.ward}`) === '') {

			noLocation += 1;

		} else {

			const {result, countyUnique } = candidates(item.county, item.ward); 
			if (result.length === 1) {
				const {pixel, longitude, latitude, county, ward} = result[0];
				const augmented = 'location-based';
				Activations.update({_id: item._id}, { $set: {	pixel, latitude, longitude, county, ward, augmented }});
				info(`Activation updated based on county/ward: ${pixel}`);
			} else {
				notUnique += 1;
				if (countyUnique && result.length > 0) {
					const augmented = `Candidates: ${result.map(item => item.cDist === 0 ? item.ward : `${item.county}:${item.ward}`).join('; ')}`; 
					Activations.update({_id: item._id}, { $set: { augmented }});
					info(`Activation updated, candidates found`, result);			
				} else {
					const augmented = 'County ok'
					Activations.update({_id: item._id}, { $set: { augmented }});
				}

			}
		}


	});

	return (`Activations without Location: ${noLocation}; not unique: ${notUnique}; phone-based update: ${phoneFound}`);

};


module.exports = { readLocationsFile, augmentLocations, readSiteTableLocations };

