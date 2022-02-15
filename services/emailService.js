require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
        user: process.env.MAIL,
        pass: process.env.APPLICATION_SPECIFIC_PASSWORD
    }
})

class EmailService {

    sendMail = (mailOptions) => 
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
}

module.exports = new EmailService()
