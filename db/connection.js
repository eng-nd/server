// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

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
};

/**
 * Purchase
 * Moulding
 * Maintenance
 * Dispatch
 * Quality
 **/
