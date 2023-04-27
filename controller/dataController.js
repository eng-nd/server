/* 

  Videos should be by playlist so that user can watch it by playlist and 
  Matlab ek aur collection banani padengi 

  Department assign karo and vola based on playlist dept: add karo department mai

    Search video by playlist -> for admin & dept head and search by assigned videos

    Without controls and privacy enabled mode


*/

const NodeCache = require("node-cache");
const cache = new NodeCache();
const Email = require("../utils/email");
const AppError = require("../utils/appError");
const {
  User,
  General,
  Production,
  MouldingAndMaintenance,
  Sales,
  HR,
  Accounts,
  DepartmentSOP,
  Dispatch,
  Quality,
  Maintenance,
} = require("./../db/connection");

exports.loginSuccess = (req, res, next) => {
  try {
    const token = req.body.token;

    const email = new Email(
      "Shubham Aggarwal",
      `${process.env.FRONTEND_URL}/`,
      `User with empId ${req.body.empId} has logged in.`,
      `One of your user has logged in.`
    );

    email
      .sendEmail()
      .then((data) => {
        res.status(200).json({
          status: "Success",
          isAuthenticated: true,
          empId: req.body.empId,
          token: token,
        });
      })
      .catch((err) => {
        console.log("Email not triggered, due to", err);
        res.status(200).json({
          status: "Success",
          isAuthenticated: true,
          empId: req.body.empId,
          token: token,
        });
      });
  } catch (err) {
    return next(new AppError(`Internal Server Error! ${err}`, 501));
  }
};

/** ?basics=true
 *
 * ?docs=true&type=(sheets|favs|trainingVideos|forms|checklist|all)
 *
 */
exports.sendUserData = (req, res, next) => {
  const basicDocs = req.query.basics || true;
  const docs = req.query.docs || false;
  let type = req.query.type;

  if (docs) {
    if (type === "all") {
      type = "sheets favs trainingVideos forms checklist -_id";
    } else if (type !== "all" && type !== undefined && type !== "") {
      type = req.query.type;
    } else {
      type = "empId name email phNum assignedDepartment position -_id";
    }
  } else {
    type = "empId name email phNum assignedDepartment position -_id";
  }

  const empId = req.body.empId;

  try {
    User.findOne({ empId: empId })
      .select(type)
      .then((data) => {
        let dataToShare = {
          data: data,
        };
        if (basicDocs) {
          const accessData = {
            isAdmin: data.assignedDepartment === 1000 ? true : false,
            isHead: data.position === 9001 ? true : false,
            isPc: data.position === 9004 ? true : false,
          };

          dataToShare = {
            data: data,
            accessData: accessData,
          };
        }
        cache.set(
          req.url,
          JSON.stringify({
            status: 200,
            dataToShare,
          })
        );

        res.status(200).json({
          status: 200,
          authenticationAllowed: true,
          dataToShare,
        });
      })
      .catch((err) => {
        return next(new AppError(`Internal Server Error! ${err}`, 501));
      });
  } catch (err) {
    return next(new AppError(`Internal Server Error! ${err}`, 501));
  }
};

exports.details = (req, res, next) => {
  try {
    const empId = req.body.empId;
    const isCompTypeRequested = req.query.companion || false;
    const isWholeTypeRequested = req.query.whole || false;
    const requestType = isCompTypeRequested
      ? "companion"
      : isWholeTypeRequested
      ? "whole"
      : "companion"; // companion, whole

    User.findOne({ empId: empId })
      .then((user) => {
        const myDepartment = user.assignedDepartment;
        req.body.requiredDepartment = myDepartment;

        if (requestType === "companion") {
          req.body.whatToShow = "empDetails";
        } else {
          if (myDepartment === 1000 || user.position <= 9001) {
            req.body.whatToShow =
              "empDetails sheets forms checklist trainingVideos";
          }
        }
        next();
      })
      .catch((err) => {
        return next(new AppError(`Internal Server Error! ${err}`, 501));
      });
  } catch (err) {
    return next(new AppError(`Internal Server Error! ${err}`, 501));
  }
};

exports.getDetails = (req, res, next) => {
  const department = req.body.requiredDepartment;

  let dpCollection;

  switch (department) {
    case 1001: {
      dpCollection = General;
      break;
    }
    case 1002: {
      dpCollection = HR;
      break;
    }
    case 1003: {
      dpCollection = Production;
      break;
    }
    case 1004: {
      dpCollection = MouldingAndMaintenance;
      break;
    }
    case 1005: {
      dpCollection = Sales;
      break;
    }
    case 1006: {
      dpCollection = Accounts;
      break;
    }
    case 1007: {
      dpCollection = Dispatch;
      break;
    }
    case 1008: {
      dpCollection = Quality;
      break;
    }

    /** 931055704 */
    /** yogesg - 7496985376 */
    /** rahul - 7496981218 */

    case 1009: {
      dpCollection = Maintenance;
      break;
    }
  }
  dpCollection
    .find({})
    .select(req.body.whatToShow)
    .then((deptBasicDetails) => {
      res.status(200).json({
        status: "Success",
        message: "Details shared",
        data: {
          deptBasicDetails,
        },
      });
    })
    .catch((err) => {
      return next(new AppError(`Internal Server Error! ${err}`, 501));
    });
};

exports.sop = (req, res, next) => {
  const isEngTypeRequested = req.query.eng || false;
  const isHindiTypeRequested = req.query.hindi || false;
  const toSelect = isEngTypeRequested
    ? "sopInEnglish"
    : isHindiTypeRequested
    ? "sopInHindi"
    : "sopInEnglish";

  User.findOne({ empId: req.body.empId }, { assignedDepartment: 1 }).then(
    (data) => {
      DepartmentSOP.findOne({ department: data.assignedDepartment })
        .select(toSelect)
        .then((data) => {
          cache.set(
            req.url,
            JSON.stringify({
              status: 200,
              data,
            })
          );
          res.status(200).json({
            data,
          });
        });
    }
  );
};

exports.getPlaylist = (req, res, next) => {
  res.status(200).json({
    status: "Success",
    data: {
      videosInIt: [
        {
          title: "Summary joining to attendance",
          link: "https://www.youtube.com/embed/80tqCjh8cNk",
        },
        {
          title: "Joining Form and ESI Form",
          link: "https://www.youtube.com/embed/vgImG4pbjC0",
        },
        {
          title: "How to fill factory attendance",
          link: "https://www.youtube.com/embed/YMlkC8VnuC0",
        },
        {
          title: "How to fill contractor attendance",
          link: "https://www.youtube.com/embed/uKgNY-RJYwQ",
        },
        {
          title: "How to update advance in record",
          link: "https://www.youtube.com/embed/BNtSO3srDKY",
        },
        {
          title: "Update record of new registered ESI PF",
          link: "https://www.youtube.com/embed/Bmk2AL6-TdM",
        },
      ],
    },
  });
};
