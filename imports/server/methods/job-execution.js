
import { readActivationsFile, countActivations } from '/imports/server/methods/activations-reader.js';
import { activations_export } from '/imports/server/methods/activations-export.js';
import { readLocationsFile } from '/imports/server/methods/locations-reader.js';
import { readGroupPoliciesFile, gp_aggregates, clear_selected } from '/imports/server/methods/group-policy-reader.js';



const executeJob = ({_id}) => {

	const { bucket, parameters, prefix, action } = ImportJobs.findOne({_id});
	const params = JSON.parse(parameters);
	
	info(`Job execution: ${action} on ${bucket}`, {bucket, params, prefix, action});
	
	let result;
	
	try {
		switch (action) {

			case 'readActivations': 
				result = readActivationsFile(bucket, params, prefix);
				break;

			case 'countActivations': 
				result = countActivations();
				break; 

			case 'readGroupPolicies': 
				result = readGroupPoliciesFile(bucket, params, prefix);
				result = '2 Group Policies read';
				break; 

			case 'readLocations': 
				result = readLocationsFile(bucket, params, prefix);
				break; 

			case 'runCalculations': 
				result = '789 Activations calculated';
				break; 

			case 'exportActivations': 
				result = activations_export(bucket, params, prefix);
				break; 

			default: 
				const msg = `executeImportJob: Action ${action} not implemented`;
				error(msg);
				throw new Meteor.Error(msg);
		}
		info(`Job execution: ${action} on ${bucket} successful.`);
		ImportJobs.update({_id}, {$set: {status: 'Success', message: '', last_run: Date.now()}});

		return result;
		
	} catch (err) {
		error(`Error in ${action}, Error: ${err.message}`, {stack: err.stack});
		ImportJobs.update({_id}, {$set: {status: 'Error', message: err.message, last_run: Date.now()}});
		throw new Meteor.Error('Error', err.message, err.stack);
	}
};


module.exports = { executeJob };
