import { getMinioObject, putMinioObject } from '/imports/server/methods/minio.js';


const readLocationsFile = (bucket, params, prefix) => {

	try {

		const filename = params.filename;
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

module.exports = { readLocationsFile };

