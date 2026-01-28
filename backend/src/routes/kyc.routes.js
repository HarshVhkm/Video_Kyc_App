// const express = require("express");
// const router = express.Router();
// const kycController = require("../controllers/kyc.controller");


// router.get("/waitlist", kycController.getVideoKycWaitlist);
// router.get("/live-schedule", kycController.getLiveScheduleKyc);
// router.get("/missed", kycController.getMissedCallsKyc);
// router.get("/search", kycController.searchKyc);
// router.get("/refresh", kycController.refreshDashboard);
// router.get("/search-past", kycController.searchPastKyc);
// router.get("/search-missed", kycController.searchMissedKyc);


// module.exports = router;



const router = require("express").Router();
const kycController = require("../controllers/kyc.controller");
const asyncHandler = require("../utils/asyncHandler");

router.get("/waitlist", asyncHandler(kycController.getVideoKycWaitlist));
router.get("/live-schedule", asyncHandler(kycController.getLiveScheduleKyc));
router.get("/missed", asyncHandler(kycController.getMissedCallsKyc));
router.get("/search", asyncHandler(kycController.searchKyc));
router.get("/refresh", asyncHandler(kycController.refreshDashboard));
router.get("/search-past", asyncHandler(kycController.searchPastKyc));
router.get("/search-missed", asyncHandler(kycController.searchMissedKyc));

module.exports = router;
