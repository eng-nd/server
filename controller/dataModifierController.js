/**
 * 
 * Document to add format
 * 
 * {
    "dataToAdd": {
        "name": "Sth",
        "link": "ssss",
        "assignedDepartment": 1002
    },
    "toSearch": "totalSheets",
    "type": "sheets",
    "requiredDepartment": 1002
}
 * 
 * 
 * Employee to add format
 * 
 * {
    "toBeUpdated": {
        "email": "s@s.com",
        "name": "Sth",
        "position": 3011,
        "phNum": "9090909090",
        "assignedDepartment": 1002
    },
    "password": "sheetal@123",
    "departmentToAdd": 1002
}
 */

const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");

const {
  User,
  UserList,
  Stats,
  Sheets,
  Forms,
  TrainingVideos,
  Checklist,
  General,
  HR,
  Accounts,
  Production,
  Sales,
  MouldingAndMaintenance,
  Dispatch,
  Maintenance,
  Quality,
} = require("./../db/connection");

exports.addEmployee = (req, res, next) => {
  try {
    User.findOne({ email: req.body.toBeUpdated.email }, { email: true }).then(
      (user) => {
        if (user) {
          res.status(403).send("User already exists");
        } else {
          let newEmpId = 0;
          Stats.find({}).then((stats) => {
            newEmpId = stats[0].totalEmp + 4001;
            req.body.toBeUpdated.empId = newEmpId;
            const newUser = new User(req.body.toBeUpdated);

            newUser.save().then((user) => {
              bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
                const secondLevelData = {
                  empId: user.empId,
                  email: user.email,
                  password: hashedPassword,
                  anyNewChange: false,
                  isEnabled: true,
                };
                const userInList = new UserList(secondLevelData);
                userInList.save();

                stats[0].totalEmp = stats[0].totalEmp + 1;
                Stats.updateOne({ _id: stats[0]._id }, { $set: stats[0] })
                  .then((data) => {
                    req.body.data = {
                      empId: user.empId,
                      name: user.name,
                      position: user.position,
                      phNumber: user.phNum,
                    };
                    next();
                  })
                  .catch((err) => {
                    return next(
                      new AppError(
                        `Error in updating total employee counts ${err}`,
                        400
                      )
                    );
                  });
              });
            });
          });
        }
      }
    );
  } catch (err) {
    return next(new AppError(`Error in creating user due to ${err}`, 400));
  }
};

exports.addInDepartment = (req, res, next) => {
  try {
    const dataToAdd = req.body.data;
    const department = req.body.departmentToAdd;
    let dpCollection;

    switch (department) {
      // Siddarth, manoj ji, gm, op, dme, md,
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
      case 1009: {
        dpCollection = Maintenance;
        break;
      }
    }

    dpCollection
      .findOneAndUpdate({}, { $push: { empDetails: dataToAdd } }, { new: true })
      .then((data) => {
        res.status(200).json({
          status: "success",
          message: "Data Added Successfully",
        });
      })
      .catch((err) => {
        return next(
          new AppError(
            `Error in pushing user to department collection ${err}`,
            400
          )
        );
      });
  } catch (err) {
    console.log(err);
    return next(
      new AppError(`Error in pushing user to department collection ${err}`, 400)
    );
  }
};

exports.addDocs = (req, res, next) => {
  try {
    const dataToAdd = req.body.dataToAdd;
    const toSearch = req.body.toSearch;
    Stats.findOne({})
      .select(toSearch)
      .then((stats) => {
        const documentId = stats[toSearch] + 1 + 6000;
        dataToAdd.documentId = documentId;
        const collection = req.body.type;

        let dpCollection;

        switch (collection) {
          case "sheets": {
            dpCollection = Sheets;
            break;
          }
          case "trainingVideos": {
            dpCollection = TrainingVideos;
            break;
          }
          case "forms": {
            dpCollection = Forms;
            break;
          }
          case "checklist": {
            dpCollection = Checklist;
            break;
          }
        }
        const newDoc = new dpCollection(dataToAdd);
        newDoc.save().then((doc) => {
          stats[toSearch] = stats[toSearch] + 1;
          Stats.updateOne({ _id: stats._id }, { $set: stats })
            .then((data) => {
              if (collection !== "trainingVideos") {
                req.body.data = {
                  documentId: doc.documentId,
                  type: "document",
                  name: doc.name,
                  link: doc.link,
                  department: doc.department,
                };
                req.body.type = collection;
              }
              next();
            })
            .catch((err) => {
              console.log(err);
              return next(
                new AppError(`Error in updating docs due to ${err}`, 400)
              );
            });
        });
      });
  } catch (err) {
    return next(new AppError(`Error in updating docs due to ${err}`, 400));
  }
};

exports.addDocInDepartment = (req, res, next) => {
  try {
    const dataToAdd = req.body.data;
    const department = req.body.requiredDepartment;
    const type = req.body.type;
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
      case 1009: {
        dpCollection = Maintenance;
        break;
      }
    }

    switch (type) {
      case "sheets": {
        dpCollection
          .findOneAndUpdate({}, { $push: { sheets: dataToAdd } }, { new: true })
          .then((data) => {
            res.status(200).json({
              status: "success",
              message: "Data Added Successfully",
            });
          })
          .catch((err) => {
            console.log(err);
            return next(
              new AppError(
                `Error in pushing user to department collection ${err}`,
                400
              )
            );
          });
        break;
      }
      case "trainingVideos": {
        dpCollection
          .findOneAndUpdate({}, { $push: { trainingVideos: dataToAdd } })
          .then((data) => {
            res.status(200).json({
              status: "success",
              message: "Data Added Successfully",
            });
          })
          .catch((err) => {
            console.log(err);
            return next(
              new AppError(
                `Error in pushing user to department collection ${err}`,
                400
              )
            );
          });
        break;
      }
      case "forms": {
        dpCollection
          .findOneAndUpdate({}, { $push: { forms: dataToAdd } })
          .then((data) => {
            res.status(200).json({
              status: "success",
              message: "Data Added Successfully",
            });
          })
          .catch((err) => {
            console.log(err);
            return next(
              new AppError(
                `Error in pushing user to department collection ${err}`,
                400
              )
            );
          });
        break;
      }
      case "checklist": {
        dpCollection
          .findOneAndUpdate({}, { $push: { checklist: dataToAdd } })
          .then((data) => {
            res.status(200).json({
              status: "success",
              message: "Data Added Successfully",
            });
          })
          .catch((err) => {
            console.log(err);
            return next(
              new AppError(
                `Error in pushing user to department collection ${err}`,
                400
              )
            );
          });
        break;
      }
    }
  } catch (err) {
    console.log(err);
    return next(
      new AppError(`Error in pushing user to department collection ${err}`, 400)
    );
  }
};

// For v2
exports.updateEmployee = (req, res) => {
  try {
    User.findOneAndUpdate(
      { email: req.body.toBeUpdated.email },
      { $set: req.body.toBeUpdated },
      { new: true }
    ).then((user) => {
      if (!user) {
        return next(new AppError("User does not exists", 400));
      }
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    });
  } catch (err) {
    return next(new AppError(`Error in updating user due to ${err}`, 400));
  }
};

// For v2
exports.updateAccess = (req, res) => {
  try {
    const status = req.body.payload.status === "enable" ? true : false;
    UserList.findOneAndUpdate({ empId: empId }, { $set: { isEnabled: status } })
      .then((user) => {
        res.status(200).send("Ok");
      })
      .catch((err) => {
        res.status(400).send("Error");
      });
  } catch (err) {
    return next(new AppError(`Error in updating user due to ${err}`, 400));
  }
};
