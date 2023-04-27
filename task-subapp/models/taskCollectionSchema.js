const mongoose = require("mongoose");

const userTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A task must have a title"],
  },
  description: {
    type: String,
    required: [true, "A task must have a description"],
  },
  deadline: {
    type: Date,
    required: [true, "A task must have a deadline"],
  },
  completedOn: {
    type: Date,
    default: null,
  },
  assigner: {
    type: String,
    required: [true, "A task must have an assigner"],
  },
});
const Task = new mongoose.Schema({
  empId: {
    type: Number,
    required: [true, "A task must have an employee id"],
  },
  pending: [userTaskSchema],
  completed: [userTaskSchema],
  afterDeadline: [userTaskSchema],
});

const HRTask = mongoose.model("HRTask", Task);
const AdminTask = mongoose.model("AdminTask", Task);
const GeneralTask = mongoose.model("GeneralTask", Task);
const ProductionTask = mongoose.model("ProductionTask", Task);
const MouldingAndMaintenanceTask = mongoose.model(
  "MouldingAndMaintenanceTask",
  Task
);
const SalesTask = mongoose.model("SalesTask", Task);
const AccountsTask = mongoose.model("AccountsTask", Task);

module.exports = {
  HRTask,
  AdminTask,
  GeneralTask,
  ProductionTask,
  MouldingAndMaintenanceTask,
  SalesTask,
  AccountsTask,
};
