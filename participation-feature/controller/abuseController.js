const { AbuseData, AbuseDataSolved } = require("../models/abuseDataSchema");
const AppError = require("./../../utils/appError");
exports.raiseAbuse = (req, res, next) => {
  try {
    console.log("here");
    const { title, empId, accusedName, description, abuseType } =
      req.body.abuse;

    const abuseDate = new Date(req.body.abuse.abuseDate);
    const dateOfFilling = new Date(req.body.abuse.dateOfFilling);

    const abuse = new AbuseData({
      title,
      empId,
      dateOfFilling,
      abuseDate,
      accusedName,
      description,
      abuseType,
    });
    abuse
      .save()
      .then((doc) => {
        res.status(200).json({
          status: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        return next(new AppError("Error", 404));
      });
  } catch (err) {
    console.log(err);
    return next(new AppError("Error", 404));
  }
};

exports.getAbuseData = (req, res, next) => {
  try {
    AbuseData.find()

      .then((doc) => {
        res.status(200).json({
          status: "success",
          data: {
            list: doc,
          },
        });
      })
      .catch((err) => {
        return next(new AppError("Error", 404));
      });
  } catch (err) {
    return next(new AppError("Error", 404));
  }
};

exports.markSolved = (req, res, next) => {
  try {
    const { id } = req.body.abuse;
    AbuseData.findByIdAndDelete(id)
      .then((doc) => {
        // AbuseDataSolved.create(doc);
        // doc.deleteOne();
        res.status(200).json({
          status: "success",
        });
      })
      .catch((err) => {
        return next(new AppError("Error", 404));
      });
  } catch (err) {
    return next(new AppError("Error", 404));
  }
};
