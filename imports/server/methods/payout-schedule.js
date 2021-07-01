console.log('loading payout-schedule.js');

import { sendMail } from '/imports/server/methods/sendmail.js';
import { bongaSMS } from '/imports/server/methods/bonga-gateway.js';

const clearPayoutSchedule = (_id) => {

	Policies.update({payout_schedule_id: _id}, { $unset: {payout_schedule_id: null }}, {multi: true});

};


const status2Str = (status) => 
[
	"New", 
	"Schedule created",
	"Approved (Actuary)", 
	"Approved (Project Manager)", 
	"Sent to Insurance", 
	"Approved by Insurance", 
	"Paid out"
][status];

const createPayoutSchedule = ({_id, title, filter}) => {

	clearPayoutSchedule(_id);

	Policies.update(JSON.parse(filter), {$set: {payout_schedule_id: _id}}, {multi: true});
	const policies = Policies.find(JSON.parse(filter));

	let sum_premium = 0.0;
	let sum_insured = 0.0;
	let sum_payout = 0.0;
	let num_policies = 0;

	policies.forEach((policy) => {

		num_policies += 1;
		sum_payout += policy.payout.actual_amount;
		sum_insured += policy.sum_insured_amount;
		sum_premium += policy.premium_amount;

	});

	PayoutSchedules.update({_id}, {$set: {sum_insured, sum_payout, sum_premium, num_policies}});

	info('Payout Schedule created', {title, sum_premium, sum_insured, sum_payout, num_policies});

};

const setStatusPayoutSchedule = (_id, newStatus) => {
	const scheduleConfig = PayoutSchedules.findOne({_id});
	const auditTrail = scheduleConfig.audit_trail ? `${scheduleConfig.audit_trail}<br />` : '';
	const message = `New Status: ${status2Str(newStatus)}`;
	PayoutSchedules.update({_id}, {$set: {
		status: newStatus, 
		audit_trail: `${auditTrail}${message}`
	}});
	info(`PayoutSchedule status set: ${message}`); 
};


const sendMailInsurance = (scheduleConfig) => {

	info('SendMail', scheduleConfig);
	sendMail({
		to: 'bnjuguna@acreafrica.com',
		subject: 'Acre Africa: A payout schedule is prepared for review',
		text: `
To whom it may concern!

A payout schedule has been prepared for review. Please log into the AcreAfrica system
and approve the schedule for payout. 
After logging in, please click on the following link: 

https://acre-staging.etherisc.com/admin/payout_schedules/details/${scheduleConfig._id}

Best regards,

Acre Africa Actuarial Team

Email: Actuarial@ACREAFRICA.COM

`
	});

};

const executePayoutSchedule = (scheduleConfig) => {

	const payouts = Policies.find(JSON.parse(scheduleConfig.filter));
	let sum_payout = 0.0;
	const schedule = [];

	let foundError = false;

	payouts.forEach((policy) => {

		if (foundError) return;
		
		// check if we had a payout from an earlier run of same schedule:
		if (policy.executedPayout && 
			policy.executedPayout.scheduleConfig._id === scheduleConfig._id) {
			info(`Policy already paid out`, policy);
			return;
		};
		
		const amount = policy.payout.actual_amount;

		if (amount < 0.01) {
			error(`Payout too small, ${amount}`, policy);
			foundError = true;
			return;
		};

		sum_payout += amount;
		
		schedule.push({
			amount,
			message: `Dear farmer,you have received payment of KsH ${amount} from ACRE Africa via OliveTree gateway, for loss covered under BimaPima insurance LR2021!`,
			mobile_num: policy.phone_no,
			policy_id: policy._id,
			scheduleConfig
		});

	});

	if (foundError) {
		const errMsg = `Error during colleting payouts - aborting!`;
		error(errMsg, scheduleConfig);
		throw new Meteor.Error(errMsg);
	};

	if (sum_payout !== scheduleConfig.sum_payout) {
		const errMsg = `Sum Payout inconsistent: Expected: ${scheduleConfig.sum_payout}, actual: ${sum_payout} - aborting!`;
		error(errMsg, scheduleConfig);
		throw new Meteor.Error(errMsg);
	};


	// Now everything seems fine!

	schedule.forEach(executedPayout => {

		try {
			// const res = bongaSMS(executedPayout);
			const res = {_id: 99};
			executedPayout.sms_id = res._id;

			Policies.update(
				{_id: executedPayout.policy_id}, 
				{ $set: {executedPayout}}
			);

		} catch (err) {
			// In case of error, we log it, but continue paying out.
			error('Unable to execute payout', payout);
		}		

	});

};



const changeStatusPayoutSchedule = async (_id) => {

	const scheduleConfig = PayoutSchedules.findOne({_id});
	if (!scheduleConfig) {
		throw new Meteor.Error("No Payoutschedule found");
	}

	switch (scheduleConfig.status) {

		case '0': // Create Payout Schedule
			createPayoutSchedule(scheduleConfig);
			setStatusPayoutSchedule(_id, '1');
			return 'Payout schedule has been created';

		case '1': // Approve by Actuary
			setStatusPayoutSchedule(_id, '3');
			return 'Approval by Actuary has been notarized';

			/*	
		case '2': // Approve by Project Manager
			setStatusPayoutSchedule(_id, '3');			
			return 'Approval by project manager has been notarized';
		*/

		case '3': // Send to Insurance
			setStatusPayoutSchedule(_id, '4');

			await sendMailInsurance(scheduleConfig);

			return 'Payout schedule has been sent to insurance company';

		case '4': // Approval by Insurance
			setStatusPayoutSchedule(_id, '5');			
			return 'Approval by insurance company has been notarized';

		case '5': // Approval by General Manager
			setStatusPayoutSchedule(_id, '6');

			await executePayoutSchedule(scheduleConfig);

			return 'Payout has been executed - process finished';

		case '6': // Finished - nothing to do
			return 'Process is already finished';

		default: // Error - unknown status
			throw new Meteor.Error(`Invalid status (${scheduleConfig.status})`);
	};


}


module.exports = { clearPayoutSchedule, createPayoutSchedule, changeStatusPayoutSchedule };