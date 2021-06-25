
import logger from '/imports/server/methods/logger.js';
import { gp_aggregates } from '/imports/server/methods/group-policy-reader.js';
import { activation_aggregates } from '/imports/server/methods/activations-reader.js';
import { executeJob } from '/imports/server/methods/job-execution.js';
import { bongaSMS } from '/imports/server/methods/bonga-gateway.js';
import { createPayoutSchedule, changeStatusPayoutSchedule } from '/imports/server/methods/payout-schedule.js';
import { applyForPolicy } from '/imports/server/methods/gif-interaction.js';

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
	executeJob,
	bongaSMS,
	createPayoutSchedule,
	changeStatusPayoutSchedule,
	applyForPolicy
});
