const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/user.repo");
const otpRepo = require("../repositories/otp.repo");
const mailer = require("../utils/mailer");
const { generateOTP } = require("../utils/otp");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepo.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const otp = generateOTP();
    await otpRepo.create(user.id, otp);
    await mailer.sendOTP(email, otp);

    // ✅ Get the expiry time and return it
    const expiry = await otpRepo.getLatestExpiry(user.id);
    
    return res.json({ 
      message: "OTP sent", 
      userId: user.id,
      expiresAt: expiry // Make sure to return this!
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const valid = await otpRepo.verify(userId, otp);
    if (!valid) return res.status(400).json({ message: "Invalid or expired OTP" });

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    await otpRepo.invalidateAll(userId);

    const otp = generateOTP();
    await otpRepo.create(userId, otp);

    const user = await userRepo.findById(userId);
    await mailer.sendOTP(user.email, otp);

    // Get the new expiry time and return it
    const expiry = await otpRepo.getLatestExpiry(userId);
    
    return res.json({ 
      message: "New OTP sent", 
      expiresAt: expiry 
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
