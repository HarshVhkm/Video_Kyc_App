const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your DigiKhata Login OTP",
      html: `<h2>Your OTP is: ${otp}</h2><p>This OTP is valid for 10 minutes.</p>`,
    });
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

const sendPasswordResetConfirmation = async (email) => {
  try {
    await transporter.sendMail({
      from: `"DigiKhata" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Successful - DigiKhata",
      text: "Your DigiKhata password has been successfully reset. If you did not request this, contact support immediately.",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Successful</h2>
          <p>Hello,</p>
          <p>Your DigiKhata password has been successfully reset.</p>
          <p>If you did not request this change, please contact our support team immediately.</p>
          <br>
          <p>Best regards,<br><strong>DigiKhata Team</strong></p>
          <hr>
          <p style="font-size:12px;color:#777">
            This is an automated message. Please do not reply.
          </p>
        </div>
      `
    });

    console.log(`Password reset confirmation email sent to ${email}`);
  } catch (error) {
    console.error("Error sending password reset confirmation email:", error);
    throw error;
  }
};


module.exports = {
  sendOTP,
  sendPasswordResetConfirmation
};