const express = require("express");
const accessController = require("../controller/accessController");
const dataController = require("../controller/dataController");
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

router
  .route("/sales/customerForInfo")
  .get(
    accessController.verifyToken,
    accessController.checkAccess,
    dataController.getCustomerForSendingMessage
  );

router.route("/ticket/whoCanFill").get(
  // accessController.verifyToken,
  // accessController.checkAccess,
  dataController.getDetailsWhoCanFillTicket
);

router.route("/ticket/forWhomCanBeFilled").get(
  // accessController.verifyToken,
  // accessController.checkAccess,
  dataController.getDetailsForWhomTicketCanBeFIlled
);

router
  .route("/sales/getDataForOrder")
  .get(
    accessController.verifyToken,
    accessController.checkAccess,
    dataController.getDataForOrderForm
  );
module.exports = router;
