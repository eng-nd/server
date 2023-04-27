/**
 *
 * Login -> userController.login, accessController.issueToken, dataController.sendUserData
 *
 * Register -> userController.register, accessController.issueToken, dataController.sendUserData
 *
 * Reset Password -> userController.resetPassword, accessController.issueToken, userController.newPassword
 *
 */
const express = require("express");
const userController = require("../controller/userController");
const accessController = require("../controller/accessController");
const dataController = require("../controller/dataController");

const router = express.Router();

router
  .route("/login")
  .post(
    userController.login,
    accessController.issueToken,
    dataController.loginSuccess
  );

router
  .route("/post-login")
  .get(
    accessController.verifyToken,
    accessController.checkAccess,
    dataController.sendUserData
  );

router
  .route("/verify-status")
  .get(
    accessController.verifyToken,
    accessController.checkAccess,
    accessController.sendConfirmationStatus
  );

router
  .route("/reset")
  .post(userController.reset, accessController.oneTimePassword);

router.route("/new-password").post(userController.newPassword);

module.exports = router;
