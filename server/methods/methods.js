
import logger from '/imports/server/methods/logger.js';
import { gp_aggregates, clear_selected } from '/imports/server/methods/group-policy-reader.js';
import { activation_aggregates, activation_export } from '/imports/server/methods/activations-reader.js';
import { executeJob } from '/imports/server/methods/job-execution.js';

const executePayouts = () => {
	Payouts.update({execute: true}, {$set: {execute: false, executed: true}}, {multi: true});
}

const selectPayouts = () => {
	Payouts.update({}, {$set: {execute: true, executed: false}}, {multi: true});
}


Meteor.methods({
		
	"logger.info": logger.method_info,
	"logger.error": logger.method_error,
	"logger.warning": logger.method_warning,
	"logger.clear": logger.method_clear,

	"payouts": executePayouts,
	"select": selectPayouts,
	gp_aggregates,
	activation_aggregates,
	activation_export,
	clear_selected,
	executeJob
});
