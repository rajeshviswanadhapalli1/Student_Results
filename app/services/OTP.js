const otpGenerator = require('otp-generator');
const { OTP_CONFIG, OTP_LENGTH } = require('../constants/constants');

module.exports.generateOTP = () => {
    console.log(OTP_CONFIG,'otpconfig');
    const OTP = otpGenerator.generate(OTP_LENGTH,OTP_CONFIG);
    return OTP;
}