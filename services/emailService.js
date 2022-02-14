const db = require('../models')

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'drol.pilif@gmail.com',
        pass: 'qxdrwmrrcypryssw' // application-specific password
    }
})

class EmailService {

    sendMail = (mailOptions) => {

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        })
    }
}

module.exports = new EmailService()
