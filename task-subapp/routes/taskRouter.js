const taskController = require("../controller/taskController");
const express = require("express");

const router = express.Router();

router.route("/add-task").post(taskController.addTask);
router.route("/mark-complete").post(taskController.markTaskAsCompleted);
router.route("/get-all").post(taskController.getTask);

module.exports = router;
