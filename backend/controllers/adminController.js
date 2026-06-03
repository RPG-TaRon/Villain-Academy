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

    res.json(academyData);
  } catch {
    res.status(500).json({
      message: "Failed to summon academy records.",
    });
  }
};

module.exports = {
  getAcademyData,
};