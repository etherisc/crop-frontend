
import { gp_aggregates, clear_selected } from '/imports/server/methods/group-policy-reader.js';
import { countActivations } from '/imports/server/methods/count.js';

const executePayouts = () => {
	Payouts.update({execute: true}, {$set: {execute: false, executed: true}}, {multi: true});
}

const selectPayouts = () => {
	Payouts.update({}, {$set: {execute: true, executed: false}}, {multi: true});
}


Meteor.methods({
	"payouts": executePayouts,
	"select": selectPayouts,
	gp_aggregates,
	clear_selected,
	countActivations
});
