const { User, Class, Assignment } = require("../models");
//below is the admin controller for the supreme villain lord
const getAcademyData = async (req, res) => {
  try {
    const users = await User.find().select("-password").lean();
    const classes = await Class.find().lean();
    const assignments = await Assignment.find().lean();

    const academyData = users.map((user) => {
      const userClasses = classes
        .filter((classItem) => {
          return classItem.instructor.toString() === user._id.toString();
        })
        .map((classItem) => {
          const classAssignments = assignments.filter((assignment) => {
            return assignment.class.toString() === classItem._id.toString();
          });

          return {
            ...classItem,
            assignments: classAssignments,
          };
        });

      return {
        ...user,
        classes: userClasses,
      };
    });

    res.json({
      stats: {
        totalVillains: users.length,
        totalClasses: classes.length,
        totalAssignments: assignments.length,
      },
      academyData,
    });
  } catch {
    res.status(500).json({
      message: "Failed to summon academy records.",
    });
  }
};
//admin functions to update and delete users, classes, and assignments.
const updateUserByAdmin = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        username: req.body.username,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        message: "Villain not found.",
      });
    }

    res.json(updatedUser);
  } catch {
    res.status(500).json({
      message: "Failed to update villain.",
    });
  }
};

const updateClassByAdmin = async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.classId,
      {
        name: req.body.name,
        description: req.body.description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedClass) {
      return res.status(404).json({
        message: "Class not found.",
      });
    }

    res.json(updatedClass);
  } catch {
    res.status(500).json({
      message: "Failed to update class.",
    });
  }
};

const updateAssignmentByAdmin = async (req, res) => {
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.assignmentId,
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
      return res.status(404).json({
        message: "Assignment not found.",
      });
    }

    res.json(updatedAssignment);
  } catch {
    res.status(500).json({
      message: "Failed to update assignment.",
    });
  }
};

const deleteUserByAdmin = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.userId) {
      return res.status(400).json({
        message: "You cannot banish yourself, Supreme One.",
      });
    }

    const userClasses = await Class.find({
      instructor: req.params.userId,
    });

    const classIds = userClasses.map((classItem) => classItem._id);

    await Assignment.deleteMany({
      class: { $in: classIds },
    });

    await Class.deleteMany({
      instructor: req.params.userId,
    });

    await User.findByIdAndDelete(req.params.userId);

    res.json({
      message:
        "Villain, their classes, and their assignments have been banished.",
    });
  } catch {
    res.status(500).json({
      message: "Failed to banish villain.",
    });
  }
};

const deleteClassByAdmin = async (req, res) => {
  try {
    await Assignment.deleteMany({ class: req.params.classId });

    await Class.findByIdAndDelete(req.params.classId);

    res.json({
      message: "Class and its assignments have been destroyed.",
    });
  } catch {
    res.status(500).json({
      message: "Failed to destroy class.",
    });
  }
};

const deleteAssignmentByAdmin = async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.assignmentId);

    res.json({
      message: "Assignment erased from the royal records.",
    });
  } catch {
    res.status(500).json({
      message: "Failed to erase assignment.",
    });
  }
};

module.exports = {
  getAcademyData,
  updateUserByAdmin,
  updateClassByAdmin,
  updateAssignmentByAdmin,
  deleteUserByAdmin,
  deleteClassByAdmin,
  deleteAssignmentByAdmin,
};