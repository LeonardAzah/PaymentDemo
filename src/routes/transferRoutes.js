const express = require("express");
const router = express.Router();
const transferController = require("../controllers/transferController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.post("/", authenticateUser, transferController.initTrans);
router.get(
  "/",
  authenticateUser,
  authorizePermissions("admin"),
  transferController.getAllTrans
);
router.post("/fees", authenticateUser, transferController.getFee);
router.get(
  "/history",
  authenticateUser,
  transferController.getUserTransferHistory
);
router.get("/:id", authenticateUser, transferController.getATransfer);

module.exports = router;
