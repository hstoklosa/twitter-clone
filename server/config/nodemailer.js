const nodemailer = require("nodemailer");

const { MAIL_SERVICE, MAIL_USER, MAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
    service: MAIL_SERVICE,
    secure: true, // use SSL
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

module.exports = { transporter };
