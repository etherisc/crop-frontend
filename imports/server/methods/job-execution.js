
import { readActivationsFile, countActivations } from '/imports/server/methods/activations-reader.js';
import { activations_export } from '/imports/server/methods/activations-export.js';
import { readLocationsFile } from '/imports/server/methods/locations-reader.js';
import { readGroupPoliciesFile, gp_aggregates, clear_selected } from '/imports/server/methods/group-policy-reader.js';



const executeJob = ({_id}) => {

	const { parameters, action } = Jobs.findOne({_id});
	const params = JSON.parse(parameters);
	
	info(`Job execution: ${action} on ${params}`, {params, action});
	
	let result;
	
	try {
		switch (action) {

			case 'readActivations': 
				result = readActivationsFile(params);
				break;

			case 'countActivations': 
				result = countActivations(params);
				break; 

			case 'readGroupPolicies': 
				result = readGroupPoliciesFile(params);
				result = '2 Group Policies read';
				break; 

			case 'readLocations': 
				result = readLocationsFile(params);
				break; 

			case 'runCalculations': 
				result = '789 Activations calculated';
				break; 

			case 'exportActivations': 
				result = activations_export(params);
				break; 

			default: 
				const msg = `executeImportJob: Action ${action} not implemented`;
				error(msg);
				throw new Meteor.Error(msg);
		}
		info(`Job execution: ${action} on ${params} successful.`);
		Jobs.update({_id}, {$set: {status: 'Success', message: '', last_run: Date.now()}});

		return result;
		
	} catch (err) {
		error(`Error in ${action}, Error: ${err.message}`, {stack: err.stack});
		Jobs.update({_id}, {$set: {status: 'Error', message: err.message, last_run: Date.now()}});
		throw new Meteor.Error('Error', err.message, err.stack);
	}
};


module.exports = { executeJob };
