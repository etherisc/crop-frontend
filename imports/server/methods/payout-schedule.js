console.log('loading payout-schedule.js');

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

const changeStatusPayoutSchedule = (_id) => {

	const scheduleConfig = PayoutSchedules.findOne({_id});
	if (!scheduleConfig) {
		throw new Meteor.Error("No Payoutschedule found");
	}
		
	switch (scheduleConfig.status) {
		case '0': // Create Payout Schedule
			createPayoutSchedule(scheduleConfig);
			setStatusPayoutSchedule(_id, '1');
			return 'Payout schedule has been created';
			break;
		case '1': // Approve by Actuary
			setStatusPayoutSchedule(_id, '2');
			return 'Approval by Actuary has been notarized';
			break;
		case '2': // Approve by Project Manager
			setStatusPayoutSchedule(_id, '3');			
			return 'Approval by project manager has been notarized';
			break;
		case '3': // Send to Insurance
			setStatusPayoutSchedule(_id, '4');
			return 'Payout schedule has been sent to insurance company';
			break;
		case '4': // Approval by Insurance
			setStatusPayoutSchedule(_id, '5');			
			return 'Approval by insurance company has been notarized';
			break;
		case '5': // Approval by General Manager
			setStatusPayoutSchedule(_id, '6');
			return 'Payout has been executed - process finished';
			break;
		case '6': // Finished - nothing to do
		default: // Error - unknown status
			throw new Meteor.Error(`Invalid status (${scheduleConfig.status})`);
	};


}


module.exports = { clearPayoutSchedule, createPayoutSchedule, changeStatusPayoutSchedule };