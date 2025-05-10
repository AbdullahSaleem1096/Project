const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "abdullahsaleem1096@gmail.com",
        pass: "msmz snul uuar pwdn"
    }
});

const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: "abdullahsaleem1096@gmail.com", // Use the actual email address
        to: email,
        subject: 'Email Verification OTP',
        html: `
            <h1>Email Verification</h1>
            <p>Your OTP for email verification is: <strong>${otp}</strong></p>
            <p>This OTP will expire in 10 minutes.</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Email sending error details:', error); // Debug log
        return false;
    }
};

module.exports = {
    sendOTPEmail
}; 

