const router = require("express").Router();
const controller = require("../controllers/auth.controller");

router.post("/login", controller.login);
router.post("/verify-otp", controller.verifyOtp);
router.post("/resend-otp", controller.resendOtp);

module.exports = router;
