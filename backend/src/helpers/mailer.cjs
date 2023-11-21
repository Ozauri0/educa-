const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transport = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: process.env.PORT,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PW,
    },
    tls: {
        ciphers: 'SSLv3',
    }
})

module.exports = transport;
    