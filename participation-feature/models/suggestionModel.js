const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  empId: {
    type: Number,
    required: true,
  },
});

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;
