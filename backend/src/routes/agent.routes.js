// const router = require("express").Router();
// const agentController = require("../controllers/agent.controller");
// const authMiddleware = require("../middleware/auth.middleware");

// router.get("/profile", authMiddleware, agentController.getProfile);
// router.put("/change-password", authMiddleware, agentController.changePassword);


// module.exports = router;


const router = require("express").Router();
const agentController = require("../controllers/agent.controller");
const authMiddleware = require("../middleware/auth.middleware");
const asyncHandler = require("../utils/asyncHandler");

router.get(
  "/profile",
  authMiddleware,
  asyncHandler(agentController.getProfile)
);

router.put(
  "/change-password",
  authMiddleware,
  asyncHandler(agentController.changePassword)
);

module.exports = router;
