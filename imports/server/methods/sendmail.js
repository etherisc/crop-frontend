console.log('loading sendmail.js');

import { settings } from '/imports/server/methods/settings.js';

const nodemailer = require('nodemailer');

let transporter = null;

const getTransporter = () => {

	if (transporter) return transporter;

	const from = settings.('smtp.from');
	const host = settings.('smtp.host');
	const port = settings.('smtp.port');
	const user = settings.('smtp.user');
	const pass = settings.('smtp.pass');

	const transport = {
		host,
		port,
		secure: true,
		auth: {
			user,
			pass
		}
	};

	try {
		transporter = nodemailer.createTransport(transport);
		return transporter;
	} catch (err) {
		error('Could not create SMTP transport', transport);
		return null;
	}
};


const sendMail = async ({to, subject, text}) => {
	if (const transporter = getTransporter()) {
		const mailInfo = await transporter.sendMail({from, to, subject, text});
		info(`Mail sent to ${to}: ${subject}`, {from, to, subject, text, mailInfo});
	} else {
		error('sendMail: No SMTP transport');
	}
};


module.exports = { sendMail };
