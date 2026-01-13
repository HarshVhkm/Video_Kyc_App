const router = require("express").Router();

router.use("/auth", require("./auth.routes"));

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Video KYC Backend",
    time: new Date().toISOString(),
  });
});

module.exports = router;
