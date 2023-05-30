const CustomerData = require("../models/dataModel");

exports.addInlListForInfo = (req, res, next) => {
  try {
    const name = req.body.name;
    const number = req.body.id;

    // add data in customerData's f array
    CustomerData.updateOne(
      {},
      {
        $push: {
          customerListForInfo: {
            name: name,
            number: number,
          },
        },
      },
      {
        new: false,
      }
    )
      .then((data) => {
        if (!data) {
          console.log("error in addInlListForInfo");
        }
        res.send("ok");
      })
      .catch((err) => {
        console.log("error in addInlListForInfo");
        res.send("not ok");
      });
  } catch (err) {}
};

exports.addInlListForCanHelpTicket = (req, res, next) => {
  try {
    const name = req.body.name;
    const number = req.body.number;

    // add data in customerData's f array
    CustomerData.updateOne(
      {},
      {
        $push: {
          helpTicketCanBeFilledBy: {
            name: name,
            number: number,
          },
        },
      },
      {
        new: false,
      }
    )
      .then((data) => {
        if (!data) {
          console.log("error in addInlListForInfo");
        }
        res.send("ok");
      })
      .catch((err) => {
        console.log("error in addInlListForInfo");
        res.send("not ok");
      });
  } catch (err) {}
};

exports.addInlListForHelpTicket = (req, res, next) => {
  try {
    const name = req.body.name;
    const number = req.body.number;

    // add data in customerData's f array
    CustomerData.updateOne(
      {},
      {
        $push: {
          helpTickerForList: {
            name: name,
            number: number,
          },
        },
      },
      {
        new: false,
      }
    )
      .then((data) => {
        if (!data) {
          console.log("error in addInlListForInfo");
        }
        res.send("ok");
      })
      .catch((err) => {
        console.log("error in addInlListForInfo");
        res.send("not ok");
      });
  } catch (err) {}
};

exports.addInlListCustomerForOrder = (req, res, next) => {
  try {
    const name = req.body.name;

    // add data in customerData's f array
    CustomerData.updateOne(
      {},
      {
        $push: {
          customerList: name,
        },
      },
      {
        new: false,
      }
    )
      .then((data) => {
        if (!data) {
          console.log("error in addInlListForInfo");
        }
        res.send("ok");
      })
      .catch((err) => {
        console.log("error in addInlListForInfo");
        res.send("not ok");
      });
  } catch (err) {}
};

exports.addInlListItemForOrder = (req, res, next) => {
  try {
    const name = req.body.name;

    CustomerData.updateOne(
      {},
      {
        $push: {
          itemList: name,
        },
      },
      {
        new: false,
      }
    )
      .then((data) => {
        if (!data) {
          console.log("error in addInlListForInfo");
        }
        res.send("ok");
      })
      .catch((err) => {
        console.log("error in addInlListForInfo");
        res.send("not ok");
      });
  } catch (err) {}
};

exports.addInlListLocationForOrder = (req, res, next) => {
  try {
    const location = req.body.location;

    CustomerData.updateOne(
      {},
      {
        $push: {
          locations: location,
        },
      },
      {
        new: false,
      }
    )
      .then((data) => {
        if (!data) {
          console.log("error in addInlListForInfo");
        }
        res.send("ok");
      })
      .catch((err) => {
        console.log("error in addInlListForInfo");
        res.send("not ok");
      });
  } catch (err) {}
};
