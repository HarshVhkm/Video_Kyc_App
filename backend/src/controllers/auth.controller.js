const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

/* =========================
   LOGIN
========================= */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const result = await authService.login({ email, password });
  res.status(200).json(result);
});

/* =========================
   VERIFY OTP
========================= */
exports.verifyOtp = asyncHandler(async (req, res) => {
  const { agtLoginId, otp } = req.body;

  if (!agtLoginId || !otp) {
    throw new ApiError(400, "Agent Login ID and OTP are required");
  }

  const result = await authService.verifyOtp({ agtLoginId, otp });
  res.status(200).json(result);
});

/* =========================
   RESEND OTP
========================= */
exports.resendOtp = asyncHandler(async (req, res) => {
  const { agtLoginId, purpose } = req.body;

  if (!agtLoginId || !purpose) {
    throw new ApiError(400, "Agent Login ID and purpose required");
  }

  const result = await authService.resendOtp({ agtLoginId, purpose });
  res.status(200).json(result);
});

/* =========================
   FORGOT PASSWORD
========================= */
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email, dob } = req.body;

  if (!email || !dob) {
    throw new ApiError(400, "Email and Date of Birth are required");
  }

  const result = await authService.forgotPassword({ email, dob });
  res.status(200).json(result);
});

/* =========================
   VERIFY FORGOT OTP
========================= */
exports.verifyForgotOtp = asyncHandler(async (req, res) => {
  const { agtLoginId, otp } = req.body;

  if (!agtLoginId || !otp) {
    throw new ApiError(400, "Agent Login ID and OTP are required");
  }

  const result = await authService.verifyForgotOtp({ agtLoginId, otp });
  res.status(200).json(result);
});

/* =========================
   RESET PASSWORD
========================= */
exports.resetPassword = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Reset token is required");
  }

  const resetToken = authHeader.split(" ")[1];
  const { newPassword } = req.body;

  if (!newPassword) {
    throw new ApiError(400, "New password is required");
  }

  const result = await authService.resetPassword(resetToken, newPassword);
  res.status(200).json(result);
});

/* =========================
   HASH PASSWORD (DEV)
========================= */
exports.hashPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const hashedPassword = await authService.hashPassword(password);
  res.status(200).json({ hashedPassword });
});

