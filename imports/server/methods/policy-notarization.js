console.log('loading policy-notarization.js');

import { settings } from '/imports/server/methods/settings.js';
import { sendTelegram } from '/imports/server/methods/telegram-transport.js';
import { applyForPolicy, underwrite, claim, payout } from '/imports/server/methods/gif-interaction.js';



const notarizePolicy = async (policy) => {
	
	info('NotarizePolicy', policy);
	
	try { await applyForPolicy({ policy }); } catch (err) { console.log(err); }
	try { await underwrite({ policy }); } catch (err) { console.log(err); }
	
	if (policy.claims) {
		
		for (let claimIndex = 0; claimIndex < policy.claims.length; claimIndex += 1) {
			const claim = policy.claims[claimIndex]
			info('> Claim', claim);
			if (claim.name != "Deductible" && claim.status == "Confirmed") {
				try { await claim({ policy }, claimIndex); } catch (err) { console.log(err); }
			}
		}
		
	} else {
		info(`No claims for Policy ${policy._id}`);
	}
	
}


const pauseFor = async (milliSec) => await new Promise((resolve) => setTimeout(resolve, milliSec));
	

const notarizeManyPolicies = async ({ filter, maxPolicies }) => {

	console.log(filter);
	const policies = Policies.find(filter).fetch();
		
	for (let pIndex = 0; pIndex < maxPolicies; pIndex += 1) {
		
		notarizePolicy(policies[pIndex]).catch(err => error(err));
		await pauseFor(1000);
		
	}

}




module.exports = { notarizeManyPolicies };