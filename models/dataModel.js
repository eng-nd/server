const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A customer must have a name"],
    trim: true,
  },
  number: {
    type: String,
    required: [true, "A customer must have a group id"],
    trim: true,
  },
});

const customerDataSchema = new mongoose.Schema({
  customerListForInfo: {
    type: [listSchema],
    default: [],
  },
  helpTickerForList: {
    type: [listSchema],
    default: [],
  },

  helpTicketCanBeFilledBy: {
    type: [listSchema],
    default: [],
  },
  itemList: [],
  customerList: [],
  locations: []
});

const CustomerData = mongoose.model("CustomerData", customerDataSchema);

module.exports = CustomerData;
