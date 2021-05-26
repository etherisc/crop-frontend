
import { readActivationsFile, countActivations } from '/imports/server/methods/activations-reader.js';
import { readGroupPoliciesFile, gp_aggregates, clear_selected } from '/imports/server/methods/group-policy-reader.js';



const executeJob = ({_id}) => {

	const { bucket, filename, filename_2, prefix, action } = ImportJobs.findOne({_id});

	info(`Job execution: ${action} on ${bucket}`, {bucket, filename, filename_2, prefix, action});
	
	let result;
	try {
		switch (action) {

			case 'readActivations': 
				result = readActivationsFile(bucket, filename, prefix);
				break;

			case 'countActivations': 
				result = countActivations();
				break; 

			case 'readGroupPolicies': 
				result = readGroupPoliciesFile(bucket, filename, filename_2, prefix);
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
		error(`Error in ${action}, Error: ${e.message}`, {stack: e.stack});
		ImportJobs.update({_id}, {$set: {status: 'Error', message: e.message, last_run: Date.now()}});
		throw new Meteor.Error('Error', e.message, e.stack);
	}
};


module.exports = { executeJob };
