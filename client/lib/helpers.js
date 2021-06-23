console.log('loading helpers.js');

const mapHeader = (key) => {
	
	const dict = {
		"name": "Name",
		"weight": "Weight",
		"begin_date": "Begin",
		"end_date": "End",
		"days": "Days",
		"block_length": "Length",
		"block_step": "Step",
		"blocks": "#",
		"loss_blocks": "Loss Blocks",
		"payout": "Payout",
		"status": "Status",
		"latitude": "Lat",
		"longitude": "Lng",
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

	}; 
	return dict[key] ? dict[key] : key;
};

const mapVal = (key, val) => {
	switch (key) {

		case "payout": 
		case "total_amount":
		case "deductible_amount": 
		case "actual_amount":
			return currency(val);
			
		case "location":
			console.log(val);
			return val.name;
			
		case "timestamp":
		case "created_at":
		case "completed_at":
			return moment(val).format('YYYY-MM-DD HH:mm:ss');

		default: return val;
	}
};

const currency = function (number) {
	if (isNaN(number)) return '';
	return Intl.NumberFormat('us-US', { style:'currency', currency: 'KES' }).format(number);
};


const round2 = function (number) {
	return Math.round(number * 100) / 100;
};


Helpers = {};

Helpers.pre = (text) => new Handlebars.SafeString(`<pre class="code">${text}</pre>`);
Helpers.safeStr = (str) => new Handlebars.SafeString(str ? str : '');
Helpers.round2 = round2;
Helpers.currency = currency;

Helpers.payout_schedule_status2Str = (status) => 
[
	"New", 
	"Schedule created",
	"Approved (Actuary)", 
	"Approved (Project Manager)", 
	"Sent to Insurance", 
	"Approved by Insurance", 
	"Paid out"
][status];


Helpers.json2table = function(value) {
	if (!value) return '';
	const jsn = typeof value === 'string' ? JSON.parse(value) : value;
	const rows = Object
	.keys(jsn)
	.map(item => `<tr><td>${mapHeader(item)}</td><td>${mapVal(item, jsn[item])}</td><tr>`)
	.join("\n");
	const table = rows === '' ? '' : 
	`<table class="custom-param-table">
<tbody>
${rows}
</tbody> 
</table>`;

	/*

<thead>
<tr><th>Param</th><th>Value</th></tr>
</thead>

*/
	return new Handlebars.SafeString(table);
};

Helpers.array2table = (arrVal) => {

	const headers = Object.keys(arrVal[0]);
	const header = `<thead><tr>${headers.map((key) => `<th>${mapHeader(key)}</th>`).join('')}</tr></thead>`;
	const body = arrVal.map((row) => `<tr>${headers.map((key) => `<td>${mapVal(key, row[key])}</td>`).join('')}</tr>`).join('\n');
	return new Handlebars.SafeString(`<table class="custom-param-table">${header}${body}</table>`);

};

Helpers.txLink = function(txHash) {
	return new Handlebars.SafeString(`<a href="https://blockscout.com/xdai/mainnet/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a>`);
};

Helpers.addressLink = function(address) {
	return new Handlebars.SafeString(`<a href="https://blockscout.com/xdai/mainnet/address/${address}" target="_blank">${address.slice(0,10)}...</a>`);
};

Helpers.displayUserEmail = function(emails, self){
	return new Handlebars.SafeString(
		emails
		.map(email => `${email.address} ${email.verified ? '<span class="fa fa-check-circle"></span>' : ''}`)
		.join('<br />')
	);
};


/********************* INSERT NEW HELPERS ABOVE *************************/


/* Register all Helpers */

_.each(Helpers, function (helper, key) {
	Handlebars.registerHelper(key, helper);
});




