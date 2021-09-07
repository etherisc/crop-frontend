import { readActivationsFile, countActivations, createPartners } from '/imports/server/methods/activations-reader.js';
import { exportActivations } from '/imports/server/methods/activations-export.js';
import { readLocationsFile, augmentLocations, readSiteTableLocations } from '/imports/server/methods/locations-reader.js';
import { gp_aggregates, calc_gp_aggregates } from '/imports/server/methods/group-policy-reader.js';
import { callApi } from '/imports/server/methods/call-api.js';
import { runContractReview } from '/imports/server/methods/run-contract-review.js';
import { readDirectPayoutsFile, executeDirectPayouts } from '/imports/server/methods/direct-payouts.js';

const jobs = {
	readActivationsFile,
	countActivations,
	createPartners,
	exportActivations,
	readLocationsFile,
	augmentLocations,
	callApi,
	runContractReview,
	calc_gp_aggregates,
	readSiteTableLocations,
	readDirectPayoutsFile,
	executeDirectPayouts
};


const executeJob = ({_id}) => {

	const { action, parameters } = Jobs.findOne({_id});
	const params = JSON.parse(parameters);
	
	info(`Job execution: ${action}`, {action, params});
	
	let result;
	
	try {
		
		let result = jobs[action](params);
		
		const message = `Job execution: ${action} successful.`;
		info(message, {action, params});
		Jobs.update({_id}, {$set: {status: 'Success', message, last_run: Date.now()}});

		if (!result) { result = message };
		
		return result;
		
	} catch (err) {
		error(`Error in ${action}, Error: ${err.message}`, {params, stack: err.stack});
		Jobs.update({_id}, {$set: {status: 'Error', message: err.message, last_run: Date.now()}});
		throw new Meteor.Error('Error', err.message, err.stack);
	}
};


module.exports = { executeJob };

