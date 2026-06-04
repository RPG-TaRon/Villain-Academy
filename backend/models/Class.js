const { Schema, model } = require("mongoose");
// below is the schema for the class model, which will be used to create classes for courses
const classSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Class = model("Class", classSchema);

module.exports = Class;