const mongoose = require("mongoose");

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

const connectionString = process.env.DATABASE_LIVE.replace(
  "<password>",
  process.env.DATABASE_LIVE_PASSWORD
);
mongoose.connect(connectionString).then(() => {
  console.log("Connection to DB successful");
});

const { UserList } = require("./../models/userListModal");
const { User } = require("./../models/userModel");
const { Sheets, Forms, Checklist } = require("./../models/documentModel");
const {
  Admin,
  General,
  Production,
  MouldingAndMaintenance,
  Sales,
  HR,
  Accounts,
  Dispatch,
  Maintenance,
  Quality,
} = require("./../models/departmentModel");
const { TrainingVideos } = require("./../models/trainingVideosModal");
const { DepartmentSOP } = require("./../models/departmentSOPModel");
const { Stats } = require("./../models/statsModel");

const {
  HRTask,
  AdminTask,
  GeneralTask,
  ProductionTask,
  MouldingAndMaintenanceTask,
  SalesTask,
  AccountsTask,
} = require("./../task-subapp/models/taskCollectionSchema");

const Suggestions = require("./../participation-feature/models/suggestionModel");

const CustomerData = require("./../models/dataModel");

module.exports = {
  UserList,
  User,
  /** Documents */
  Sheets,
  Forms,
  Checklist,
  TrainingVideos,
  /** Departments */
  Admin,
  General,
  Production,
  MouldingAndMaintenance,
  Sales,
  HR,
  Accounts,
  Dispatch,
  Maintenance,
  Quality,
  DepartmentSOP,
  /** General Purpose */
  Stats,
  /** Future Purpose */
  HRTask,
  AdminTask,
  GeneralTask,
  ProductionTask,
  MouldingAndMaintenanceTask,
  SalesTask,
  AccountsTask,
  /** Collaboration Specific */
  Suggestions,

  /* Customer data */
  CustomerData,
};

/**
 * Purchase
 * Moulding
 * Maintenance
 * Dispatch
 * Quality
 **/
