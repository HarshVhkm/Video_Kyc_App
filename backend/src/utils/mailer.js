const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOTP = async (email, otp) => {
  await transporter.sendMail({
    to: email,
    subject: "Your DigiKhata Login OTP",
    html: `<h2>Your OTP is: ${otp}</h2>`,
  });
};
