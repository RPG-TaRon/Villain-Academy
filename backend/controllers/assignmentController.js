const { Class, Assignment } = require("../models");

const createAssignment = async (req, res) => {
  try {
    const foundClass = await Class.findOne({
      _id: req.params.classId,
      instructor: req.user._id,
    });

    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    const newAssignment = await Assignment.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      class: req.params.classId,
    });

    res.status(201).json(newAssignment);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create assignment",
      error: err.message,
    });
  }
};

module.exports = {
  createAssignment,
};