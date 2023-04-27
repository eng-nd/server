const Suggestions = require("../models/suggestionModel");

exports.addSuggestion = (req, res, next) => {
  console.log(req.body.suggestion, "########");
  try {
    const { title, description, genre, empId } = req.body.suggestion;
    const suggestion = new Suggestions({
      title,
      description,
      genre,
      empId,
    });
    suggestion
      .save()
      .then((doc) => {
        res.status(200).json({
          status: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          status: "fail",
          message: err,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteSuggestion = (req, res, next) => {
  try {
    const { id } = req.body;
    Suggestions.findByIdAndDelete(id)

      .then((doc) => {
        res.status(200).json({
          status: "success",
          data: doc,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "fail",
          message: err,
        });
      });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getSuggestionData = (req, res, next) => {
  try {
    Suggestions.find()

      .then((doc) => {
        res.status(200).json({
          status: "success",
          data: {
            list: doc,
          },
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: "fail",
          message: err,
        });
      });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
