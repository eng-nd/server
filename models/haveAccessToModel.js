const mongoose = require("mongoose");

const haveAccessToSchema = new mongoose.Schema({
  employeeName: {
    type: String,
  },
  empId: {
    type: Number,
  },
});

module.exports = haveAccessToSchema;
