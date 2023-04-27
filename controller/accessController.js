const jwt = require("jsonwebtoken");
const { UserList } = require("../models/userListModal");
const { User } = require("../models/userModel");
const AppError = require("../utils/appError");
const crypto = require("crypto");
const Email = require("./../utils/email");

function generateAccessToken(username) {
  return jwt.sign(username, process.env.JSON_SECRET, { expiresIn: "7d" });
}

exports.issueToken = (req, res, next) => {
  try {
    const empId = req.body.empId;

    const payload = {
      empId: empId,
      email: req.body.email,
    };

    const token = generateAccessToken(payload);

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    req.body.token = token;

    next();
  } catch (err) {
    return next(new AppError(`Internal Server Error due to ${err}`, 501));
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }
    if (!token) {
      return next(new AppError("No token provided", 401));
    }
    jwt.verify(token, process.env.JSON_SECRET, (err, decoded) => {
      if (err) {
        return next(new AppError("Unauthorized!", 401));
      } else {
        req.body.empId = decoded.empId;
      }
    });

    next();
  } catch (err) {
    return next(new AppError(`Internal Server Error! ${err}`, 501));
  }
};

// exports.refreshTokens = (req, res, next) => {
//   try {
//     const { refreshToken } = req.body;
//     if (!refreshToken) {
//       return next(new AppError("No token provided", 401));
//     }
//     const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return next(new AppError("No user found", 404));
//     }
//     const accessToken = generateAccessToken(user.id);
//     res.json({ accessToken });
//   } catch (err) {
//     return next(new AppError("Unauthorized!", 401));
//   }
// };

exports.checkAccess = (req, res, next) => {
  try {
    const userId = req.body.empId;

    UserList.findOne({ empId: userId })
      .then((user) => {
        if (!user) {
          return next(
            new AppError("Incorrect user Or user now doesn't exists", 401)
          );
        }

        if (!user.isEnabled) {
          return next(
            new AppError(
              "Access for the user is denied!. Please contact DME",
              403
            )
          );
        }
        next();
      })
      .catch((err) => {
        return new AppError(`Internal Server Error with ${err}`, 501);
      });
  } catch (err) {
    return new AppError(`Internal Server Error with ${err}`, 501);
  }
};

exports.oneTimePassword = (req, res, next) => {
  try {
    const userId = req.body.empId;
    crypto
      .randomBytes(8, (err, buffer) => {
        if (err) {
          return next(new AppError(`Internal Server Error with ${err}`, 501));
        }
        const otp = buffer.toString("hex").substring(0, 8);
        console.log(otp);

        UserList.findOne({ empId: userId }).then((user) => {
          user.resetToken = otp;
          user.resetTokenExpiration = Date.now() + 3600000;
          user.save();

          const email = new Email(
            "Shubham Aggarwal",
            `${process.env.FRONTEND_URL}/auth/reset/otp`,
            `Request OTP for your request is <span style="color: red; text-decoration: underline">${otp}</span> Make sure you use this OTP within 1 hour.`,
            "Email for password reset."
          );

          email.sendEmail().then((data) => {
            res.status(200).json({
              status: "success",
              message: "OTP sent to your registered email",
            });
          });
        });
      })
      .catch((err) => {
        return new AppError(`Internal Server Error with ${err}`, 501);
      });
  } catch (err) {
    return new AppError(`Internal Server Error with ${err}`, 501);
  }
};

exports.sendConfirmationStatus = (req, res, next) => {
  try {
    res.status(200).json({
      status: "ok",
    });
  } catch (err) {
    return new AppError(`Internal Server Error with ${err}`, 501);
  }
};
