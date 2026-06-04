const { Class } = require("../models");
//class controller for instructors to create, read, update, and delete classes for their courses
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

const updateClass = async (req, res) => {
  try {
    const updatedClass = await Class.findOneAndUpdate(
      {
        _id: req.params.id,
        instructor: req.user._id,
      },
      {
        name: req.body.name,
        description: req.body.description,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    res.json(updatedClass);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update class",
      error: err.message,
    });
  }
};

const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findOneAndDelete({
      _id: req.params.id,
      instructor: req.user._id,
    });

    if (!deletedClass) {
      return res.status(404).json({
        message: "Class not found",
      });
    }

    res.json({
      message: "Class deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete class",
      error: err.message,
    });
  }
};

module.exports = {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  deleteClass,
};
