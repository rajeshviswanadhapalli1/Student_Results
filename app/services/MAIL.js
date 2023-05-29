const nodemailer = require('nodemailer');
const { MAIL_SETTINGS } = require('../constants/constants');
console.log(MAIL_SETTINGS,'in email page MAIsl');

const transporter = nodemailer.createTransport(MAIL_SETTINGS);


module.exports.sendEmail = async(params) => {
    console.log(params,'params');
    try {
        let info = await transporter.sendMail({
            from : MAIL_SETTINGS.auth.user,
            to : params.to,
            subject : 'Verify Your OTP',
            html : `
                <div class="container" style="max-width:90%;margin:auto;padding-top:20px">
                    <h2>Welcome to the Student Results</h2>
                    <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${params.OTP}</h1>
        <p style="margin-top:50px;">If you do not request for verification please do not respond to the mail. You can in turn un subscribe to the mailing list and we will never bother you again.</p>
                </div>
            `
        })
        return info;
    } catch (error) {
        console.log(error);
        return false;
    }
}