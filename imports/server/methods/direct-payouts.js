import { getMinioObject, putMinioObject } from '/imports/server/methods/minio.js';
import { settings } from '/imports/server/methods/settings.js';
import { bongaSMS } from '/imports/server/methods/bonga-gateway.js';
import { sendTelegram } from '/imports/server/methods/telegram-transport.js';

const readDirectPayoutsFile = ({bucket, filename, prefix}) => {

	try {

		const dp_content = getMinioObject(bucket, filename);

		const dp_json = JSON.parse(dp_content);

		DirectPayouts.remove({prefix});	

		const status = 'created';
		const message = (amount) => `Dear farmer,you have received payment of Ksh ${amount} from ACRE Africa via OliveTree gateway, for season LR2021!`;

		let counter = 0;
		dp_json.forEach(item => {

			counter += 1;

			let {
				mobile_num,
				amount
			} = item; 

			const result = DirectPayouts.insert(
				{ 
					mobile_num,
					message: message(amount),
					amount, 
					prefix,
					status
				}
			);
		});

		info('readDirectPayoutsFile successful', { counter });

		return `${counter} direct payouts imported.`;

	} catch (e) {
		throw new Meteor.Error('Error', e.message, e.stack);
	}
};

const mockSMS = (payout) => {

	sendTelegram(`SMS to +${payout.mobile_num}`);
	sendTelegram(payout.message);
	console.log(`SMS to +${payout.mobile_num}`);

	return {msg: 'Mock SMS successfull sent', _id: 99};

};

const executeDirectPayouts = ({filter}) => {


	const schedule = DirectPayouts.find(filter).fetch();
	const liveMode = settings('payout.mode') === 'live';

	info(`executeDirectPayouts: ${schedule.length} payouts selected, executing in mode=${liveMode}`);
	
	let successCnt = 0;
	let errorCnt = 0;

	for (let idx = 0; idx < schedule.length; idx += 1) {
		const executedPayout = schedule[idx];
		info(`Executing #${idx}`, executedPayout);
		try {
											// {mobile_num, message, amount = 0.0}
			const res = liveMode ? bongaSMS(executedPayout) : mockSMS(executedPayout)

			DirectPayouts.update(
				{_id: executedPayout._id}, 
				{ $set: {
					status: 'executed',
					msg: res.msg
				}}
			);
			
			successCnt += 1;

		} catch (err) {
			// In case of error, we log it, but continue paying out.
			error('Unable to execute payout', {executedPayout, msg: err.msg, stack: err.stack});
			errorCnt += 1;
		}		

	};
	
	info(`executeDirectPayouts: ${successCnt} successfull, ${errorCnt} errors`);

};

const aggregatedDirectPayouts = ({filter}) => {
	
	const schedule = DirectPayouts.find(filter).fetch();
	
};

module.exports = { readDirectPayoutsFile, executeDirectPayouts };



