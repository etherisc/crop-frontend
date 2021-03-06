console.log('loading utils.js');


const currency = function (number) {
	if (isNaN(number)) return '';
	return Intl.NumberFormat('us-US', { style:'currency', currency: 'KES' }).format(number);
};


const round2 = function (number) {
	if (isNaN(number)) return '';
	return Math.round(number * 100) / 100;
};

const percentage = (number) => {
	if (isNaN(number)) return '';
	return Intl.NumberFormat('us-US', { style:'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
};

const mapHeader = (key) => {

	const dict = {
		"name": "Name",
		"weight": "Weight",
		"begin_date": "Begin",
		"end_date": "End",
		"days": "Days",
		"config": "hidden",
		"block_length": "Length",
		"block_step": "Step",
		"blocks": "#",
		"loss_blocks": "Loss Blocks",
		"payout": "Payout",
		"status": "Status",
		"latitude": "Lat",
		"longitude": "Lng",
		"location": "hidden",
		"ip_total_amount": "Total",
		"ip_deductible_amount": "Deductible",
		"ip_actual_amount": "Actual",
		"total_amount": "Total",
		"deductible_amount": "Deductible",
		"actual_amount": "Actual",
		"job_id": "Job Id",
		"process_id": "Process Id",
		"created_at": "Created",
		"completed_at": "Completed",
		"phone_no": "Mobile Num",
		"voucher_no": "Voucher",
		"timestamp": "Timestamp",
		"transaction_no": "hidden",
		"stage_info": "hidden",
		"stage_config": "hidden",
		"stage_blocks": "hidden",
		"amount": "Amount",
		"business_tx_id": "Business Task",
		"task_id": "Task ID"

	}; 
	return dict[key] === 'hidden' ? null : (dict[key] ? dict[key] : key);
};

const mapVal = (key, val, data) => {

	if (data && 'activation' in data) key = `ip_${key}`;

	switch (key) {

		case "payout":
		case "weight":
			return percentage(val);

		case "ip_total_amount":
		case "ip_deductible_amount": 
		case "ip_actual_amount":
		case "total_amount":
		case "deductible_amount": 
		case "actual_amount":
			return currency(val);

		case "location":
			return val.name ? val.name : val;

		case "timestamp":
		case "created_at":
		case "completed_at":
			return moment(val).format('YYYY-MM-DD HH:mm:ss');

		case "transaction_no":
			return null;

		default: return val;
	}
};


const short = (txt, len) => `${txt.slice(0, len)}...`;
const bpKey2uuid = (bpKey) => {
	if (!bpKey || bpKey == '') return '';
	const raw = Buffer.from(bpKey.slice(2), 'hex').toString('hex').replace(/(00)+$/, '');
	return `${raw.slice(0,8)}-${raw.slice(8,12)}-${raw.slice(12,16)}-${raw.slice(16,20)}-${raw.slice(20,32)}`;
}

const pre = (text) => new Handlebars.SafeString(`<pre class="code">${text}</pre>`);
const safeStr = (str) => new Handlebars.SafeString(str ? str : '');

const payout_schedule_status2Str = (status) => 
[
	"New", 
	"Schedule created",
	"Approved (Actuary)", 
	"Approved (Project Manager)", 
	"Sent to Insurance", 
	"Approved by Insurance", 
	"Paid out"
][status];


const json2table = function(value, data) {
	if (!value) return '';
	const jsn = typeof value === 'string' ? JSON.parse(value) : value;
	const rows = Object
	.keys(jsn)
	.map(item => mapHeader(item) ? `<tr><td>${mapHeader(item)}</td><td>${mapVal(item, jsn[item], data)}</td><tr>` : '')
	.join("\n");
	const table = rows === '' ? '' : 
	`<table class="custom-param-table">
<tbody>
${rows}
</tbody> 
</table>`;

	return new Handlebars.SafeString(table);
};

const array2table = (arrVal) => {

	const headers = Object.keys(arrVal[0]);
	const header = `<thead><tr>${headers.map((key) => mapHeader(key) ? `<th>${mapHeader(key)}</th>` : '').join('')}</tr></thead>`;
	const body = `<tbody>${arrVal.map((row) => `<tr>${headers.map((key) => mapHeader(key) ? `<td>${mapVal(key, row[key])}</td>` : '').join('')}</tr>`).join('\n')}</tbody>`;
	return new Handlebars.SafeString(`<table class="custom-param-table">${header}${body}</table>`);

};


const bcAuditTrail = (bc) => {

	if (!bc) return '';
	const txLink = (txHash) => `<a href="https://blockscout.com/xdai/mainnet/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a>`;
	const lines = [];
	if (bc.apply) lines.push({ step: 'Apply', tx: txLink(bc.apply.transactionHash), payload: `Policy Data Hash: ${bc.apply.hash}` });
	if (bc.underwrite) lines.push({ step: 'Underwrite', tx: txLink(bc.underwrite.transactionHash), payload: 'n/a'});
	if (bc.claim) lines.push({ step: 'Seed Subsidy', tx: txLink(bc.claim.transactionHash), payload: `Data Hash: ${bc.claim.hash}` });
	if (bc.payout) lines.push({ step: 'Payout', tx: txLink(bc.payout.transactionHash), payload: `Payout-Id: ${bc.payout.payoutId}` });

	const line = ({step, tx, payload}) => `<tr><td>${step}</td><td>${tx}</td><td>${payload}</td></tr>`;
	const header = `<thead><tr><th>Step</th><th>Tx</th><th>Payload</th></tr></thead>`;
	const body = `<tbody>${lines.map(line).join('\n')}</tbody>`;
	const table = `<p><strong>Business Key:</strong> ${bpKey2uuid(bc.bpKey)}</p><table class="custom-param-table">${header}${body}</table>`;

	return new Handlebars.SafeString(table);

}

const txLink = function(txHash) {
	return new Handlebars.SafeString(`<a href="https://blockscout.com/xdai/mainnet/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a>`);
};

const addressLink = function(address) {
	return new Handlebars.SafeString(`<a href="https://blockscout.com/xdai/mainnet/address/${address}" target="_blank">${address.slice(0,10)}...</a>`);
};

const displayUserEmail = function(emails, self){
	return new Handlebars.SafeString(
		emails
		.map(email => `${email.address} ${email.verified ? '<span class="fa fa-check-circle"></span>' : ''}`)
		.join('<br />')
	);
};

const showActionButton = function(method) {
	return true;
	
	/*
	if (!this.policy.bc && method === 'apply') return true;
	return (this.policy.bc && this.policy.bc.next_action && method === this.policy.bc.next_action);
	*/
}


const policyPayouts = function(claims) {
	
	let payout = {
		ip_total_amount: 0.0,
		ip_actual_amount: 0.0,
		ip_deductible_amount: 0.0
	};

	claims.forEach(claim => {
		if (!claim.amount) return;
		payout.ip_actual_amount += claim.amount;
		if (claim.name == 'Deductible') {
			payout.ip_deductible_amount -= claim.amount;
		} else {
			payout.ip_total_amount += claim.amount;
		}
	});

	if (payout.ip_actual_amount < 0) payout.ip_actual_amount = 0.0;
	
	return json2table(payout);
};

module.exports = {

	currency,
	round2,
	percentage,
	mapHeader,
	mapVal, 
	short, 
	bpKey2uuid, 
	pre, 
	safeStr,
	round2, 
	currency,
	percentage,
	payout_schedule_status2Str,
	json2table,
	array2table,
	bcAuditTrail,
	txLink,
	addressLink,
	displayUserEmail,
	showActionButton,
	policyPayouts

};