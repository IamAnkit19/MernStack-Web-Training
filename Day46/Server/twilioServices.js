const twilio = require('twilio');
const accountSID = 'ACa4eb036bf3695fca86db03c8e2b734a7';
const authToken = '4852b94a9aa45234be0ffe9f3782cd18';

const client = new twilio(accountSID, authToken);

const sendOtp = (phoneNumber, otp) => {
    return client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+16823397018',
        to: phoneNumber
    });
};

module.exports = sendOtp;