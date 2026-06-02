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

const getAssignmentsByClass = async (req, res) => {
  try {
    const foundClass = await Class.findOne({
      _id: req.params.classId,
      instructor: req.user._id,
    });

    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    const assignments = await Assignment.find({
      class: req.params.classId,
    });

    res.json(assignments);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch assignments",
      error: err.message,
    });
  }
};

const updateAssignment = async (req, res) => {
  try {
    const foundClass = await Class.findOne({
      _id: req.params.classId,
      instructor: req.user._id,
    });

    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    const updatedAssignment = await Assignment.findOneAndUpdate(
      {
        _id: req.params.assignmentId,
        class: req.params.classId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json(updatedAssignment);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update assignment",
      error: err.message,
    });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const foundClass = await Class.findOne({
      _id: req.params.classId,
      instructor: req.user._id,
    });

    if (!foundClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    const deletedAssignment = await Assignment.findOneAndDelete({
      _id: req.params.assignmentId,
      class: req.params.classId,
    });

    if (!deletedAssignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete assignment",
      error: err.message,
    });
  }
};

module.exports = {
  createAssignment,
  getAssignmentsByClass,
  updateAssignment,
  deleteAssignment,
};