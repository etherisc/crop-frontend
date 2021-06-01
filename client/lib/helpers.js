console.log('loading helpers.js');

Helpers = {};

Helpers.pre = function(text) {
	return new Handlebars.SafeString('<pre class="code">' + text + '</pre>');
};


Helpers.json2table = function(text) {
	const jsn = JSON.parse(text);
	const rows = Object
		.keys(jsn)
		.map(item => `<tr><td>${item}</td><td>${jsn[item]}</td><tr>`)
		.join("\n");
	const table = rows === '' ? '' : 
`<table class="custom-param-table">
	<thead>
		<tr><th>Param</th><th>Value</th></tr>
	</thead>
	<tbody>
		${rows}
	</tbody> 
</table>`;
	
	return new Handlebars.SafeString(table);
};


Helpers.txLink = function(txHash) {
	return new Handlebars.SafeString(`<a href="https://blockscout.com/xdai/mainnet/tx/${txHash}" target="_blank">${txHash.slice(0,10)}...</a>`);
};

Helpers.addressLink = function(address) {
	return new Handlebars.SafeString(`<a href="https://blockscout.com/xdai/mainnet/address/${address}" target="_blank">${address.slice(0,10)}...</a>`);
};


Helpers.round2 = function (number) {
	return Math.round(number * 100) / 100;
};

Helpers.currency = function (number) {
	return Intl.NumberFormat('us-US', { style:'currency', currency: 'KES' }).format(number);
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




