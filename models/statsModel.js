const mongoose = require("mongoose");

const statsModel = new mongoose.Schema({
  totalEmp: {
    type: Number,
    default: 0,
  },
  totalSheets: {
    type: Number,
    default: 0,
  },
  totalLists: {
    type: Number,
    default: 0,
  },
  totalForms: {
    type: Number,
    default: 0,
  },
  totalVideos: {
    type: Number,
    default: 0,
  },
});

const Stats = mongoose.model("Stats", statsModel);

module.exports = { Stats };
