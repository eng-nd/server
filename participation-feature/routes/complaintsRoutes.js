const express = require("express");
const abuseDataController = require("./../controller/abuseController");

const router = express.Router();

router.route("/add-complaint").post(abuseDataController.raiseAbuse);
router.route("/mark-complete").post(abuseDataController.markSolved);
router.route("/get-all").post(abuseDataController.getAbuseData);

module.exports = router;
