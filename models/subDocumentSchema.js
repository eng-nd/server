const mongoose = require("mongoose");

const subDocumentSchema = new mongoose.Schema({
  documentId: {
    type: Number,
    required: [true, "A document must have an acceptable id"],
  },
  type: {
    type: String,
    required: [true, "A document must have a type"],
  },
  name: {
    type: String,
    required: [true, "A document without name is useless"],
  },
  link: {
    type: String,
    required: [true, "A document without link is of no use"],
  },
  department: {
    type: Number,
    required: [true, "A document must be assigned a department"],
  },
});

const vSchema = new mongoose.Schema({
  documentId: {
    type: Number,
    required: [true, "A document must have an acceptable id"],
    default: 0,
  },
  type: {
    type: String,
    required: [true, "A document must have a type"],
  },
  name: {
    type: String,
    required: [true, "A document without name is useless"],
  },
  link: {
    type: String,
    required: [true, "A document without link is of no use"],
  },
  department: {
    type: Number,
    required: [true, "A document must be assigned a department"],
  },
  playlistShared: {
    type: Boolean,
    default: false,
  },
  playlistID: {
    type: Number,
    default: 1,
  },
});

module.exports = { subDocumentSchema, vSchema };
