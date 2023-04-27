const mongoose = require("mongoose");

const DepartmentSOPSchema = new mongoose.Schema({
  department: {
    type: Number,
    unique: true,
  },
  sopInEng: {
    type: Array,
    default: [],
  },
  sopInHindi: {
    type: Array,
    default: [],
  },
});

const DepartmentSOP = mongoose.model("DepartmentSOP", DepartmentSOPSchema);

module.exports = { DepartmentSOP };
