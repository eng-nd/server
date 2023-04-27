const mongoose = require("mongoose");
const haveAccessToModel = require("./haveAccessToModel");

const documentToBeSavedSchema = new mongoose.Schema(
  {
    documentId: {
      type: Number,
      unique: [true, "Document with same Id already exits"],
      required: [true, "Document id is required"],
    },
    assignedDepartment: {
      type: Number,
      required: [true, "A document must be assigned a department"],
    },
    name: {
      type: String,
      required: [true, "Document should have a name describing what it is"],
    },
    link: {
      type: String,
      required: [
        true,
        "Please provide a link to the document so that it can be accessible",
      ],
    },
    accessibleTo: {
      type: [haveAccessToModel],
      default: [],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }, //virtual to be part of output
  }
);

const Sheets = mongoose.model("Sheets", documentToBeSavedSchema);
const Forms = mongoose.model("Forms", documentToBeSavedSchema);
const Checklist = mongoose.model("Checklist", documentToBeSavedSchema);

module.exports = { Sheets, Forms, Checklist };
