// const router = require("express").Router();
// const authController = require("../controllers/auth.controller");
// const authDashboard = require("../controllers/auth.dashboarddata");
// const pastKycController = require("../repositories/pastkyc.repo")

// // Authentication routes
// router.post("/login", authController.login);
// router.post("/verify-otp", authController.verifyOtp);
// router.post("/resend-otp", authController.resendOtp);

// // Password reset routes
// router.post("/forgot-password", authController.forgotPassword);
// router.post("/verify-forgot-otp", authController.verifyForgotOtp);
// router.post("/reset-password", authController.resetPassword);

// // Utility route (for testing/development)
// router.post("/hash-password", authController.hashPassword);

// // work-dashboard pai chart
// router.get(
//   "/work-dashboard",
//   authDashboard.getDashboard
// );

// // past kyc
// router.get("/past", pastKycController.getPastKycCalls);
// module.exports = router;

const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const authDashboard = require("../controllers/auth.dashboarddata");
const pastKycController = require("../repositories/pastkyc.repo")
const asyncHandler = require("../utils/asyncHandler");

// Auth
router.post("/login", asyncHandler(authController.login));
router.post("/verify-otp", asyncHandler(authController.verifyOtp));
router.post("/resend-otp", asyncHandler(authController.resendOtp));

// Password reset
router.post("/forgot-password", asyncHandler(authController.forgotPassword));
router.post("/verify-forgot-otp", asyncHandler(authController.verifyForgotOtp));
router.post("/reset-password", asyncHandler(authController.resetPassword));

// Utility
router.post("/hash-password", asyncHandler(authController.hashPassword));

// Dashboard
router.get("/work-dashboard", asyncHandler(authDashboard.getDashboard));

// Past KYC
router.get("/past", asyncHandler(pastKycController.getPastKycCalls));

module.exports = router;
