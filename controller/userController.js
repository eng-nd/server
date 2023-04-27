const bcrypt = require("bcryptjs");
const { User, UserList } = require("./../db/connection");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const AppError = require("../utils/appError");

SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.EMAIL_SENDER_API_KEY;

exports.login = (req, res, next) => {
  try {
    userEmail = req.body.email;
    userPassword = req.body.password;

    if (userEmail === "" || userPassword === "") {
      return next(new AppError("No email or password entered", 401));
    }

    UserList.findOne({
      email: userEmail,
    })
      .then((user) => {
        if (!user) {
          console.log(email, password);
          return next(new AppError("Incorrect email or password", 401));
        }

        if (!user.isEnabled) {
          return next(
            new AppError(
              "Access for the user is denied!. Please contact DME",
              403
            )
          );
        }

        bcrypt
          .compare(userPassword, user.password)
          .then((ifMatched) => {
            if (!ifMatched) {
              return next(new AppError("Incorrect email or password", 401));
            }
            req.body.empId = user.empId;
            next();
          })
          .catch((err) => {
            return new AppError(`Internal Server Error with ${err}`, 501);
          });
      })
      .catch((err) => {
        return new AppError(`Internal Server Error with ${err}`, 501);
      });
  } catch (err) {
    return new AppError(`Internal Server Error with ${err}`, 501);
  }
};

exports.reset = (req, res, next) => {
  console.log("Email: ", req.body);

  try {
    console.log("Email: ", req.body.payload.email);
    const userEmail = req.body.payload.email;

    UserList.findOne({
      email: userEmail,
    })
      .then((user) => {
        if (!user) {
          return next(
            new AppError("Incorrect email or account doesn't exists.", 401)
          );
        }

        if (!user.isEnabled) {
          return new AppError(
            "Access for the user is denied!. Please contact DME",
            403
          );
        }

        req.body.empId = user.empId;
        console.log(req.body.empId);
        next();
      })
      .catch((err) => {
        return new AppError(`Internal Server Error with ${err}`, 501);
      });
  } catch (err) {
    return new AppError(`Internal Server Error with ${err}`, 501);
  }
};

exports.newPassword = (req, res, next) => {
  try {
    const otp = req.body.payload.otp;
    const newPassword = req.body.payload.password;
    const email = req.body.payload.email;

    UserList.findOne({
      email: email,
      resetTokenExpiration: { $gt: Date.now() },
    }).then((user) => {
      if (!user) {
        return next(new AppError("Invalid OTP or OTP expired", 401));
      }

      if (user.resetToken !== otp) {
        return next(new AppError("Invalid OTP or OTP expired", 401));
      }
      bcrypt
        .hash(newPassword, 12)
        .then((hashedPassword) => {
          user.password = hashedPassword;
          user.resetToken = undefined;
          user.resetTokenExpiration = undefined;
          user.save();
          res.status(200).json({
            status: "Success",
            message: "Password reset successfully",
          });
        })
        .catch((err) => {
          return next(new AppError(`Internal Server Error! ${err}`, 501));
        });
    });
  } catch (err) {
    return next(new AppError(`Internal Server Error! ${err}`, 501));
  }
};

exports.userDetails = (req, res, next) => {
  const empId = req.body.empId;
  try {
    User.findOne({ empId: empId }, { password: false }).select(
      "fav sheets forms trainingVideos"
    ); //then send response
  } catch (err) {
    return next(new AppError(`Internal Server Error! ${err}`, 501));
  }
};

// exports.favorite = async (req, res) => {
//   try {
//     const userId = req.body.empId;

//     const { accessAllowed } = axios("/check", { empId: userId });

//     if (!accessAllowed) {
//       res.status(400).json({
//         status: "Failure",
//         message: "Access for the user is denied or account doesn't exists",
//       });
//     }

//     User.find({ empId: userId }, { favLinks: true })
//       .then((user) => {
//         if (user.favLinks.length <= 0) {
//           // 0 coerces to false
//           res.status(200).json({
//             status: "No Favs",
//             message: "User do not have any fav links",
//           });
//         }

//         res.status(200).json({
//           status: "Success",
//           message: "Sharing favs links",
//           data: {
//             user,
//           },
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           status: "Failure",
//           message: err.message,
//         });
//       });
//   } catch (err) {
//     res.status(400).json({
//       status: "Failure",
//       message: err.message,
//     });
//   }
// };
// exports.markFavorite = async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const docId = req.body.docId;
//   } catch (err) {
//     res.status(400).json({
//       status: "Failure",
//       message: err.message,
//     });
//   }
// };

exports.updateAccessAddition = (req, res) => {
  try {
    const userId = req.body.empId;
    const docType = req.body.docType;
    const docId = req.body.docId;
    const usersListWhomToGiveAccess = req.body.userList; // Object contains id and name

    for (let i in usersListWhomToGiveAccess) {
      // Based on doc type update has Accessible to
      // Add in user collection based on doc type
    }
  } catch (err) {
    res.status(404).json({
      status: "Failure",
      message: "Unexpected things happening at our end",
    });
  }
};

exports.updateAccessDeletion = (req, res) => {
  try {
    const userId = req.body.empId;
    const docType = req.body.docType;
    const docId = req.body.docId;
    const usersListWhomToRevokeAccess = req.body.userList; // Object contains id and name

    for (let i in usersListWhomToRevokeAccess) {
      // Based on doc type update has Accessible to (remove the user from array)
      // Find user in collection and based on doc type delete that document
    }
  } catch (err) {
    res.status(404).json({
      status: "Failure",
      message: "Unexpected things happening at our end",
    });
  }
};
