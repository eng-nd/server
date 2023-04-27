const mongoose = require("mongoose");

const abuseDataSchema = new mongoose.Schema({
  empId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  dateOfFilling: {
    type: Date,
    default: Date.now,
  },
  abuseDate: {
    type: Date,
    required: true,
  },
  accusedName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  abuseType: {
    type: String,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Pending",
  },
  dateOfClosure: {
    type: Date,
  },
});

const AbuseData = mongoose.model("AbuseData", abuseDataSchema);
const AbuseDataSolved = mongoose.model("AbuseDataSolved", abuseDataSchema);
module.exports = { AbuseData, AbuseDataSolved };
