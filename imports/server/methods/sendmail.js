console.log('loading sendmail.js');

const nodemailer = require('nodemailer');

const from = 'claims@acreafrica.com';

const transport = {
  host: "mail.acreafrica.com",
  port: 465,
  secure: true,
  auth: {
    user: "claims@acreafrica.com",
    pass: "dE@nz,N0xot*"
  }
};


const transporter = nodemailer.createTransport(transport);


const sendMail = async ({to, subject, text}) => {
	
	const mailInfo = await transporter.sendMail({from, to, subject, text});
	info(`Mail sent to ${to}: ${subject}`, {from, to, subject, text, mailInfo});
	
	
};


module.exports = { sendMail };
	