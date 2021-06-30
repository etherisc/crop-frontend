console.log('loading sendmail.js');

const nodemailer = require('nodemailer');


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


const sendMail = ({to, subject, text}) => {
	
	const mailInfo = transporter.sendMail({to, subject, text});
	info(`Mail sent to ${to}: ${subject}`, {to, subject, text, mailInfo});
	
	
};


module.exports = { sendMail };
	