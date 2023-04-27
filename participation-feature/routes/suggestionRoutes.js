const express = require("express");
const suggestionDataController = require("./../controller/suggestionController");

const router = express.Router();

router.route("/add-suggestion").post(suggestionDataController.addSuggestion);
router.route("/mark-complete").post(suggestionDataController.deleteSuggestion);
router.route("/get-all").post(suggestionDataController.getSuggestionData);
module.exports = router;
