const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  skill: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City", required: true },
});

// Remove any individual unique index on 'skill' and instead add a compound unique index
// This ensures that the combination of { skill, user, city } is unique, allowing the same skill
// to be added by the same user in different cities.
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
