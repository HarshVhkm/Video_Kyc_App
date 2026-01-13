const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/user.repo");
const otpRepo = require("../repositories/otp.repo");
const mailer = require("../utils/mailer");
const { generateOTP } = require("../utils/otp");


exports.login = async ({ email, password }) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("User not found");


  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid password");
const bcrypt = require('bcrypt');

(async () => {
  const plainPassword = "yogesh@123";
  const hash = await bcrypt.hash(plainPassword, 10); // 10 salt rounds
  console.log(hash);
})();



  const otp = generateOTP();
  await otpRepo.create(user.id, otp);
  await mailer.sendOTP(email, otp);

  return { message: "OTP sent to email", userId: user.id };
};

exports.verifyOtp = async ({ userId, otp }) => {
  const valid = await otpRepo.verify(userId, otp);
  if (!valid) throw new Error("Invalid OTP");

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { message: "Login successful", token };
};
