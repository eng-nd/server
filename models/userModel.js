const mongoose = require("mongoose");
const { subDocumentSchema, vSchema } = require("./subDocumentSchema");

const userSchema = new mongoose.Schema(
  {
    empId: {
      type: Number,
      required: [true, "An employee must have an employee id"],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [
        true,
        "First thing human owns is his name. Please enter a name",
      ],
    },
    email: {
      type: String,
      required: [true, "A user must have an user-email"],
      unique: true,
    },
    phNum: {
      type: String,
      required: [true, "An employee must have a contact number"],
    },
    assignedDepartment: {
      type: Number,
      required: [true, "An employee must be assigned a department"],
    },
    position: {
      type: Number,
      required: [true, "An employee designation should be mentioned"],
      default: "Employee",
    },
    favs: {
      type: [subDocumentSchema],
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
    checklists: {
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
    toObject: { virtuals: true },
  }
);

const User = mongoose.model("Users", userSchema);

module.exports = { User };
