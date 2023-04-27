const mongoose = require("mongoose");
const haveAccessToModel = require("./haveAccessToModel");

const trainingVideosSchema = new mongoose.Schema(
  {
    documentId: {
      type: Number,
      unique: [true, "Video with the id already exists"],
      required: [true, "A video should have an id"],
    },
    playlistId: {
      type: Number,
      default: null,
    },
    assignedDepartment: {
      type: Number,
      required: [true, "A video when storing should be assigned a department"],
    },
    title: {
      type: String,
      required: [true, "Video must have a title"],
    },
    link: {
      type: String,
      unique: [true, "A video with same link already exists in database"],
      required: [true, "Storing video without link is useless"],
    },
    questions: {
      type: [String],
      required: false,
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

const TrainingVideos = mongoose.model("Videos", trainingVideosSchema);

module.exports = { TrainingVideos };
