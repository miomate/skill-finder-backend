const { Schema, model } = require("mongoose");
const user = require("./User.model");
const city = require("./City.model");

const skillSchema = new Schema(
  {
    skill: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const skill = model("Skill", skillSchema);

module.exports = skill;
