const express = require("express");
const dataModifierController = require("../controller/dataModifierController");
const accessController = require("../controller/accessController");
const router = express.Router();

router
  .route("/add/employee")
  .post(
    accessController.verifyToken,
    accessController.checkAccess,
    dataModifierController.addEmployee,
    dataModifierController.addInDepartment
  );
router
  .route("/add/docs")
  .post(
    accessController.verifyToken,
    accessController.checkAccess,
    dataModifierController.addDocs,
    dataModifierController.addDocInDepartment
  );

router.route("/update/employees").post(dataModifierController.updateEmployee);
router
  .route("/update/employees/status")
  .post(
    accessController.verifyToken,
    accessController.checkAccess,
    dataModifierController.updateAccess
  );

module.exports = router;
