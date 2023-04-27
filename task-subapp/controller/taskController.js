/**
 *
 *
 * use department wise collection
 * each department holds every user pending, completed, and afterDeadline task
 *
 * If user is not present in the collection then create a new record for that user
 *
 * If there occur any type of error then send a response with status 500 except in case of user not found send 404 which
 * will hardly occur.
 *
 */

const {
  HRTask,
  AdminTask,
  GeneralTask,
  ProductionTask,
  MouldingAndMaintenanceTask,
  SalesTask,
  AccountsTask,
} = require("../models/taskCollectionSchema");

const AppError = require("../../utils/appError");
const { Dispatch } = require("../../models/departmentModel");

exports.addInUserTask = (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

exports.addTask = (req, res, next) => {
  // When sending task data it will also contain users empId & department
  try {
    //Based on department of user and empId as unique identifier do the operation
    const empId = req.body.task.empId;
    const workerDepartment = req.body.task.department;
    const createdBy = req.body.task.createdBy; //You or PC

    let collectionToUse = null;
    switch (workerDepartment) {
      case 1000:
        collectionToUse = AdminTask;
        break;
      case 1001: {
        collectionToUse = GeneralTask;
        break;
      }
      case 1002: {
        collectionToUse = HRTask;
        break;
      }
      case 1003: {
        collectionToUse = ProductionTask;
        break;
      }
      case 1004: {
        collectionToUse = MouldingAndMaintenanceTask;
        break;
      }
      case 1005: {
        collectionToUse = SalesTask;
        break;
      }
      case 1006: {
        collectionToUse = AccountsTask;
        break;
      }
      case 1007: {
        collectionToUse = Dispatch;
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

    collectionToUse
      .findOne({ empId: empId }, { pending: 1 })
      .then((tasklist) => {
        if (!tasklist) {
          collectionToUse
            .create({
              empId: empId,
              pending: [],
              completed: [],
              afterDeadline: [],
            })
            .then((tasklist) => {
              tasklist.pending.push({
                title: req.body.task.title,
                description: req.body.task.description,
                deadline: new Date(req.body.task.deadline),
                completedOn: null,
                assigner: createdBy,
              });
              tasklist.save().catch((err) => {
                console.log(err);
                next(new AppError("Cannot create user record", 500));
              });
            })
            .catch((err) => {
              //Cannot create user record
              console.log(err);
              next(new AppError("Cannot create user record", 500));
            });
        } else {
          tasklist.pending.push({
            title: req.body.task.title,
            description: req.body.task.description,
            deadline: new Date(req.body.task.deadline),
            completedOn: null,
            assigner: createdBy,
          });
          tasklist.save().catch((err) => {
            console.log(err);
            next(new AppError("Cannot create user record", 500));
          });
        }
        res
          .status(200)
          .json({
            status: "success",
          })
          .catch((err) => {
            console.log(err);
            next(new AppError("Cannot create user record", 500));
          });
      });
  } catch (error) {
    console.log(error);
    next(new AppError("Cannot create user record", 500));
  }
};

exports.markTaskAsCompleted = (req, res, next) => {
  try {
    const empId = req.body.task.empId;
    const workerDepartment = req.body.task.department;
    const taskId = req.body.task.taskId;
    const requestedClosure = new Date(req.body.task.requestedClosure);

    let collectionToUse = null;
    switch (workerDepartment) {
      case 1000:
        collectionToUse = AdminTask;
        break;
      case 1001: {
        collectionToUse = GeneralTask;
        break;
      }
      case 1002: {
        collectionToUse = HRTask;
        break;
      }
      case 1003: {
        collectionToUse = ProductionTask;
        break;
      }
      case 1004: {
        collectionToUse = MouldingAndMaintenanceTask;
        break;
      }
      case 1005: {
        collectionToUse = SalesTask;
        break;
      }
      case 1006: {
        collectionToUse = AccountsTask;
        break;
      }
      case 1007: {
        collectionToUse = Dispatch;
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

    collectionToUse
      .findOne({ empId: empId })
      .then((userTaskRecords) => {
        if (!userTaskRecords) {
          // Throw error that user do not exists.
          next(new AppError("User do not exists", 404));
        } else {
          // Get the particular task based on taskId compare the requestedClosure date with deadline date
          // and based on it put it in either completed or afterDeadline array
          userTaskRecords.pending.forEach((task) => {
            if (task._id == taskId) {
              if (task.deadline > requestedClosure) {
                task.completedOn = requestedClosure;
                userTaskRecords.completed.push(task);
                userTaskRecords.pending.splice(
                  userTaskRecords.pending.indexOf(task),
                  1
                );
                userTaskRecords.save().catch((err) => {
                  console.log(err);
                  next(new AppError("Cannot perform requested action", 500));
                });
              } else {
                task.completedOn = requestedClosure;
                userTaskRecords.afterDeadline.push(task);
                userTaskRecords.pending.splice(
                  userTaskRecords.pending.indexOf(task),
                  1
                );
                userTaskRecords.save().catch((err) => {
                  console.log(err);
                  next(new AppError("Cannot perform requested action", 500));
                });
              }
            }
          });
          res.status(200).json({
            status: "success",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        next(new AppError("Cannot perform requested action", 500));
      });
  } catch (error) {
    console.log(error);
    next(new AppError("Cannot perform requested action", 500));
  }
};

exports.getTask = (req, res, next) => {
  try {
    const empId = req.body.task.empId;
    const workerDepartment = req.body.task.department;

    let collectionToUse = null;

    switch (workerDepartment) {
      case 1000:
        collectionToUse = AdminTask;
        break;
      case 1001: {
        collectionToUse = GeneralTask;
        break;
      }
      case 1002: {
        collectionToUse = HRTask;
        break;
      }
      case 1003: {
        collectionToUse = ProductionTask;
        break;
      }
      case 1004: {
        collectionToUse = MouldingAndMaintenanceTask;
        break;
      }
      case 1005: {
        collectionToUse = SalesTask;
        break;
      }
      case 1006: {
        collectionToUse = AccountsTask;
        break;
      }
      case 1007: {
        collectionToUse = Dispatch;
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

    collectionToUse
      .findOne({ empId: empId })
      .then((tasklist) => {
        if (!tasklist) {
          collectionToUse
            .create({
              empId: empId,
              pending: [],
              completed: [],
              afterDeadline: [],
            })
            .catch((err) => {
              console.log(err);
              next(new AppError("Cannot perform requested action", 500));
            });
          res.status(200).json({
            status: "success",
            data: {
              tasklist: {
                empId: empId,
                pending: [],
                completed: [],
                afterDeadline: [],
              },
            },
          });
        } else {
          res.status(200).json({
            status: "success",
            data: { tasklist },
          });
        }
      })
      .catch((err) => {
        console.log(err);
        next(new AppError("Cannot perform requested action", 500));
      });
  } catch (error) {
    console.log(error);
    next(new AppError("Cannot perform requested action", 500));
  }
};
