const nodemailer = require('nodemailer');
require('dotenv').config({path: '../.env'});

const sendEmail = async(options)=>{
	const transporter = nodemailer.createTransport({
		process: process.env.EMAIL_SERVICE,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	});

	const mailOptions = {
		from: `${process.env.FROM_NAME}<${process.env.EMAIL_USER}>`,
		to: options.email,
		subject: options.subject,
		text: options.message
	};

	await transporter.sendMail(mailOptions);
}
