console.log('loading policy-notarization.js');

import { settings } from '/imports/server/methods/settings.js';
import { sendTelegram } from '/imports/server/methods/telegram-transport.js';
import { applyForPolicy, underwrite, claim, payout } from '/imports/server/methods/gif-interaction.js';

const noop = () => null;

const notarizePolicy = async (policy) => {

	info('NotarizePolicy', policy);

	try { 
		sendTelegram(`applyForPolicy ${policy._id}`);
		await applyForPolicy({ policy }); 
	} catch (err) { 
		noop(); 
	}

	try { 
		sendTelegram(`underwrite ${policy._id}`);
		await underwrite({ policy }); 
	} catch (err) { 
		noop(); 
	}

	if (policy.claims) {

		for (let claimIndex = 0; claimIndex < policy.claims.length; claimIndex += 1) {
			const thisClaim = policy.claims[claimIndex]
			if (
				thisClaim.status == "Confirmed" && 
				thisClaim.amount > 0
			) {
				try { 
					sendTelegram(`claim ${policy._id} #${claimIndex}`);
					await claim({ policy }, claimIndex); 

				} catch (err) { 
					noop(); 
				}
			}
		}

	} else {
		info(`No claims for Policy ${policy._id}`);
	}

}


const pauseFor = async (milliSec) => await new Promise((resolve) => setTimeout(resolve, milliSec));


const notarizeManyPolicies = async ({ filter, maxPolicies }) => {

	const policies = Policies.find().fetch();

	for (let pIndex = 0; pIndex < maxPolicies; pIndex += 1) {

		notarizePolicy(policies[pIndex]).catch(err => noop());
		await pauseFor(1000);

	}

}




module.exports = { notarizeManyPolicies };