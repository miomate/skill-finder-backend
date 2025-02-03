const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  skill: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
});

// Create a compound index so that the combination of skill, user, and city must be unique.
// This allows the same skill name to exist if either the user or city is different.
skillSchema.index({ skill: 1, user: 1, city: 1 }, { unique: true });

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;

// const mongoose = require("mongoose");

// const skillSchema = new mongoose.Schema({
//   skill: { type: String, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
// });

// const Skill = mongoose.model("Skill", skillSchema);

// module.exports = Skill;
