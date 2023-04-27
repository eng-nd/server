const mongoose = require("mongoose");

const userListSchema = mongoose.Schema({
  empId: {
    type: Number,
    required: [true, "An employee must have an employee id"],
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "A user must have an user-email"],
  },
  password: {
    type: String,
    required: [true, "A password is required for authentication purpose"],
  },
  anyNewChange: {
    type: Boolean,
    default: false,
  },
  isEnabled: {
    type: Boolean,
    required: [true, "An employee status must be present "],
    default: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
});

const UserList = mongoose.model("UserList", userListSchema);
module.exports = { UserList };
