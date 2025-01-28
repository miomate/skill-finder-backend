const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the skill model to whatever makes sense in this case
const skillSchema = new Schema(
  {
    skill: {
      type: String,
      required: true,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const skill = model("skill", skillSchema);

module.exports = skill;
