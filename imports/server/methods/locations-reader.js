import { getMinioObject, putMinioObject } from '/imports/server/methods/minio.js';

const { get: levDistance } = require('fast-levensthein');


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
	const levenstheinCutoff = 4; // give it a try
	
	const locs = Locations
		.find({})
		.fetch()
		.map(({pixel, county, ward, latitude, longitude}) => {
			return ({pixel, cwNorm: normalizeCountyWard(county, ward), county, ward, latitude, longitude});
		});
	
	const candidates = (cty, wrd) => {
		
		const cwNorm = normalizeCountyWard(cty, wrd);
		let result = [];
		locs.forEach(loc => {
			const dist = levDistance(cwNorm, loc.cwNorm);
			if (dist < levenstheinCutoff) {
				result.push({
					cwNorm: loc.cwNorm,
					pixel: loc.pixel,
					latitude: loc.latitude,
					longitude: loc.longitude, 
					county: loc.county,
					ward: loc.ward
				});
			}
		});
			
		info(`Candidates for ${cwNorm}: ${result.length}`, result);
		
		return result;
		
	};
	
	
	const activations = Activations.find({pixel: ZERO});
	
	activations.forEach(item => {
		const cand = candidates(item.county, item.ward); 
		if (cand.length === 1) {
			const {pixel, longitude, latitude, county, ward} = cand[0];
			Activations.update({_id: item._id}, { $set: {	pixel, latitude, longitude, county, ward }});
			info(`Activations updated ${pixel}`);		
	});
			
	
	
};


module.exports = { readLocationsFile, augmentLocations };

