const { Schema, model } = require("mongoose");
// below is the schema for the assignment model, which will be used to create assignments for classes
const assignmentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Assigned", "In Progress", "Completed"],
      default: "Assigned",
    },

    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Assignment = model("Assignment", assignmentSchema);

module.exports = Assignment;