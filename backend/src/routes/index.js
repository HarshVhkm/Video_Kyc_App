const router = require("express").Router();

router.use("/auth", require("./auth.routes"));

router.use("/agent", require("./agent.routes"));

//dashboard
router.use("/kyc", require("./kyc.routes"));


// Health check route
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    service: "Video KYC Backend",
    timestamp: new Date().toISOString(),
  });

  
});

module.exports = router;