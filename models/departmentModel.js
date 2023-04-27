const mongoose = require("mongoose");
const { subDocumentSchema, vSchema } = require("./subDocumentSchema");

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

// mongoose.connect(DB).then(() => {
//   console.log("Connection to DB successful");
// });

const employeeSchemaForDepartmentPurpose = new mongoose.Schema({
  empId: {
    type: Number,
    required: [true, "An employee must have an employee id"],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "First thing human owns is his name. Please enter a name"],
  },
  position: {
    type: Number,
    required: [true, "An employee designation should be mentioned"],
  },
  phNumber: {
    type: String,
    trim: true,
    required: [true, "An employee must have a contact number"],
  },
});

const departmentSchema = new mongoose.Schema(
  {
    empDetails: {
      type: [employeeSchemaForDepartmentPurpose],
      default: [],
    },
    sheets: {
      type: [subDocumentSchema],
      default: [],
    },
    forms: {
      type: [subDocumentSchema],
      default: [],
    },
    checklist: {
      type: [subDocumentSchema],
      default: [],
    },
    trainingVideos: {
      type: [vSchema],
      default: [],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }, //virtual to be part of output
  }
);
const Admin = mongoose.model("Admin", departmentSchema);
const General = mongoose.model("General", departmentSchema);
const Production = mongoose.model("Production", departmentSchema);
const MouldingAndMaintenance = mongoose.model(
  "MouldingAndMaintenance",
  departmentSchema
);
const Sales = mongoose.model("Sales", departmentSchema);
const HR = mongoose.model("HR", departmentSchema);
const Accounts = mongoose.model("Accounts", departmentSchema);
const Dispatch = mongoose.model("Dispatch", departmentSchema);
const Maintenance = mongoose.model("Maintenance", departmentSchema);
const Quality = mongoose.model("Quality", departmentSchema);
module.exports = {
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
};
