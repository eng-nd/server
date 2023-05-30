const express = require("express");
const dataModifierController = require("../controller/dataModifierController");
const accessController = require("../controller/accessController");
const customerController = require("../controller/customerController");
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

router
  .route("/update/employees")
  .post(
    accessController.verifyToken,
    accessController.checkAccess,
    dataModifierController.updateEmployee
  );

router
  .route("/update/employees/status")
  .post(
    accessController.verifyToken,
    accessController.checkAccess,
    dataModifierController.updateAccess
  );

router
  .route("/update/customer/add-info")
  .post(
    accessController.verifyToken,
    accessController.checkAccess,
    customerController.addInlListForInfo
  );

router
  .route("/update/ticket/add-for")
  .post(
    accessController.verifyToken,
    accessController.checkAccess,
    customerController.addInlListForHelpTicket
  );

router
  .route("/update/ticket/add-who")
  .post(
    accessController.verifyToken,
    accessController.checkAccess,
    customerController.addInlListForCanHelpTicket
  );

router
  .route("/update/order/customer")
  .post(
    accessController.verifyToken,
    accessController.checkAccess,
    customerController.addInlListCustomerForOrder
  );

router
  .route("/update/order/item")
  .post(
    accessController.verifyToken,
    accessController.checkAccess,
    customerController.addInlListItemForOrder
  );

module.exports = router;
