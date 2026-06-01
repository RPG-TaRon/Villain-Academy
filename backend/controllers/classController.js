const { Class } = require("../models");

const createClass = async (req, res) => {
  try {
    const newClass = await Class.create({
      name: req.body.name,
      description: req.body.description,
      instructor: req.user._id,
    });

    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create class",
      error: err.message,
    });
  }
};

const getClasses = async (req, res) => {
  try {
    const classes = await Class.find({
      instructor: req.user._id,
    });

    res.json(classes);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch classes",
      error: err.message,
    });
  }
};

module.exports = {
  createClass,
  getClasses,
};