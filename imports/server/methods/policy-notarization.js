console.log('loading policy-notarization.js');

import { settings } from '/imports/server/methods/settings.js';
import { sendTelegram } from '/imports/server/methods/telegram-transport.js';
import { applyForPolicy, underwrite, claim, payout } from '/imports/server/methods/gif-interaction.js';

const noop = () => null;

const notarizePolicy = async (policy) => {

	info('NotarizePolicy', policy);

	try { 
		await applyForPolicy({ policy }); 
	} catch ({ message, stack }) { 
		error(message, { message, stack });
	}

	try { 
		await underwrite({ policy }); 
	} catch ({ message, stack }) { 
		error(message, { message, stack });
	}

	if (policy.claims) {

		for (let claimIndex = 0; claimIndex < policy.claims.length; claimIndex += 1) {
			const thisClaim = policy.claims[claimIndex]
			if (
				thisClaim.status == "Confirmed" && 
				thisClaim.amount > 0
			) {
				try { 
					await claim({ policy }, claimIndex); 

				} catch ({ message, stack }) { 
					error(message, { message, stack });
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

		await notarizePolicy(policies[pIndex]);
		// await pauseFor(1000);

	}


	return "Notarization complete";
}




module.exports = { notarizeManyPolicies };