require('dotenv').config();

module.exports = {
    JWT_SECRET : 'PrivateKey',
    OTP_LENGTH : 4,
    OTP_CONFIG : {
        digits:true,
        upperCaseAlphabets : false,
        specialChars : false,
        lowerCaseAlphabets:false,
    },
    MAIL_SETTINGS : {
        // service : 'gmail',
        host:'smtp-relay.sendinblue.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth : {
            user : process.env.MAIL_EMAIL,
            pass : process.env.MAIL_PASSWORD
        }
    },
    SERVER_DB_URI : process.env.DB_URI,
}