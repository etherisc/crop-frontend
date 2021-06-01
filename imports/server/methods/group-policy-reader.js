/* Group Policy Reader */

import { getMinioObject } from '/imports/server/methods/minio.js';

const readGroupPoliciesFile = ({ bucket, folder, output, group_policies, policies }) => {
	
	const gp_filename = `${folder}/${output}/${group_policies}`;
	const ip_filename = `${folder}/${output}/${policies}`;

	const gp_content = getMinioObject(bucket, gp_filename);

	const gp_json = JSON.parse(gp_content);

	const ip_content = getMinioObject(bucket, ip_filename);

	const ip_json = JSON.parse(ip_content);

	GroupPolicies.remove({});
	CropStages.remove({});
	IPolicies.remove({});


	gp_json.forEach(item => {

		const idParts = item.id.split('.');
		const season = `${idParts[1]}-${idParts[2]}`;
		const value_chain = `${idParts[3]}-${idParts[4]}`;
		const location = idParts[5];

		const result = GroupPolicies.upsert(
			{ 
				'gp_id': item.id 
			},
			{ 
				$set: {
					gp_id: item.id,
					season,
					value_chain,
					location,
					date_begin: new Date(item.date_begin),
					date_end: new Date(item.date_end),
					payout_total: item.payout_total,
					deductible_type: item.deductible_type,
					hurdle: item.hurdle,
					payout_actual: item.payout_actual,
					sw_date_begin: new Date(item.sow_window.date_begin),
					sw_count: item.sow_window.sow_window_count,
					sw_length: item.sow_window.sow_window_length,
					sw_window: item.sow_window.sow_window,
					sw_date: new Date(item.sow_window.sow_date),
					acc_payments: 0.0,
					acc_sum_insured: 0.0,
					acc_amount_total: 0.0,
					acc_amount_deductible: 0.0,
					acc_amount: 0.0,
					acc_policies: 0
				}
			}
		);

		if (result.insertedId) {

			item.crop_stages.forEach(stage => {

				CropStages.upsert(
					{
						gp_mongo_id: result.insertedId,
						cs_id: stage.id,
						weight: stage.weight,
						date_begin: new Date(stage.date_begin),
						date_end: new Date(stage.date_end),
						trigger: stage.trigger,
						blocks_total: stage.blocks_total,
						blocks_loss: stage.blocks_loss
					},
					{ 
						$set: {
							gp_mongo_id: result.insertedId,
							cs_id: stage.id,
							weight: stage.weight,
							date_begin: new Date(stage.date_begin),
							date_end: new Date(stage.date_end),
							trigger: stage.trigger,
							blocks_total: stage.blocks_total,
							blocks_loss: stage.blocks_loss,
							payout: stage.payout
						}
					}
				);

			});
		}		
	});


	ip_json.forEach(item => {

		if (!(item.voucher_no && item.phone_no && item.crop && item.activation && item.activation.timestamp)) return;

		const gp = GroupPolicies.findOne({gp_id: item.group_policy_id});
		let upsertData = {
			gp_mongo_id: gp ? gp._id : null,
			voucher_no: item.voucher_no,
			phone_no: item.phone_no,
			crop: item.crop,
			activation_window: item.activation_window,
			location: item.location,
			date_begin: new Date(item.date_begin),
			date_end: new Date(item.date_end),
			activation_timestamp: new Date(item.activation.timestamp),
			group_policy_id: item.group_policy_id,
			premium: item.premium,
			sum_insured: item.sum_insured
		};
		
		if (item.payments && item.payments[0]) {
			upsertData = Object.assign(upsertData, {
				paym_mpesa_no: item.payments[0].mpesa_no,
				paym_timestamp: new Date(item.payments[0].timestamp),
				paym_amount: item.payments[0].amount
			});
		};

		if (item.payout) {
			upsertData = Object.assign(upsertData, {
				payout_timestamp: new Date(item.payout.timestamp),
				payout_amount_total: item.payout.amount_total,
				payout_amount_deductible: item.payout.amount_deductible,
				payout_amount: item.payout.amount
			});
		}

		IPolicies.upsert(
			{
				voucher_no: item.voucher_no,
				phone_no: item.phone_no,
				crop: item.crop,
				activation_timestamp: new Date(item.activation.timestamp)
			},
			{
				$set: upsertData
			}
		);

		if (gp) {

			GroupPolicies.update(
				{
					_id: gp._id
				},
				{
					$set: {
						acc_policies: gp.acc_policies + 1,
						acc_payments: gp.acc_payments + item.payments[0].amount,
						acc_sum_insured: gp.acc_sum_insured + item.sum_insured,
						acc_amount_total: gp.acc_amount_total + item.payout.amount_total,
						acc_amount_deductible: gp.acc_amount_deductible + item.payout.amount_deductible,
						acc_amount: gp.acc_amount + item.payout.amount
					}
				}
			);
		}

	});


}


const gp_aggregates = function (filter) {

	const selected = GroupPolicies.find(filter).fetch();

	let payments = 0.0;
	let sum_insured = 0.0;
	let policies = 0;
	let amount = 0.0;

	selected.forEach(item => {
		policies = policies + item.acc_policies;
		payments = payments + item.acc_payments;
		sum_insured = sum_insured + item.acc_sum_insured;
		amount = amount + item.acc_amount;
	});

	info('Calculate Group Policies aggregates', {payments, sum_insured, policies, amount});

	return {
		payments,
		sum_insured,
		policies,
		amount
	};

}

const clear_selected = function () {

	GroupPolicies.update({}, {$set: {select_for_payout: false}}, {multi: true});
}


module.exports = { readGroupPoliciesFile, gp_aggregates, clear_selected };





