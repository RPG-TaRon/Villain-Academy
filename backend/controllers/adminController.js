const { User, Class, Assignment } = require("../models");

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

const deleteUserByAdmin = async (req, res) => {
  try {
    if (req.user._id.toString() === req.params.userId) {
      return res.status(400).json({
        message: "You cannot banish yourself, Supreme One.",
      });
    }

    await Class.deleteMany({ instructor: req.params.userId });

    await User.findByIdAndDelete(req.params.userId);

    res.json({
      message: "Villain and their classes have been banished.",
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
  deleteUserByAdmin,
  deleteClassByAdmin,
  deleteAssignmentByAdmin,
};