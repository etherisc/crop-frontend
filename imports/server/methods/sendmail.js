console.log('loading sendmail.js');

import { settings } from '/imports/server/methods/settings.js';

const nodemailer = require('nodemailer');

const from = settings.('smtp.from');
const host = settings.('smtp.host');
const port = settings.('smtp.port');
const user = settings.('smtp.user');
const pass = settings.('smtp.pass');

const transport = {
  host: "mail.acreafrica.com",
  port: 465,
  secure: true,
  auth: {
    user: "claims@acreafrica.com",
    pass: ""
  }
};


const transporter = nodemailer.createTransport(transport);


const sendMail = async ({to, subject, text}) => {
	
	const mailInfo = await transporter.sendMail({from, to, subject, text});
	info(`Mail sent to ${to}: ${subject}`, {from, to, subject, text, mailInfo});
	
	
};


module.exports = { sendMail };
	