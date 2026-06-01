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

const getClassById = async (req, res) => {
  try {
    const foundClass = await Class.findOne({
      _id: req.params.id,
      instructor: req.user._id,
    });

    if (!foundClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    res.json(foundClass);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch class",
      error: err.message,
    });
  }
};

module.exports = {
  createClass,
  getClasses,
  getClassById,
};