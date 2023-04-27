const express = require("express");
const userController = require("../controller/userController");
const accessController = require("../controller/accessController");
const dataController = require("../controller/dataController");
const dataModifierController = require("../controller/dataModifierController");
const router = express.Router();

router
  .route("/my-department")
  .get(
    accessController.verifyToken,
    accessController.checkAccess,
    dataController.details,
    dataController.getDetails
  );

router
  .route("/my-sop")
  .get(
    accessController.verifyToken,
    accessController.checkAccess,
    dataController.sop
  );

router
  .route("/get-data")
  .get(
    accessController.verifyToken,
    accessController.checkAccess,
    dataController.sendUserData
  );

router
  .route("/video/playlist")
  .get(
    accessController.verifyToken,
    accessController.checkAccess,
    dataController.getPlaylist
  );
module.exports = router;
