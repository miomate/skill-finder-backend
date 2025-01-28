const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
username: {
type: String,
lowercase: true,
trim: true,
required: true,
unique: true,
},
passwordHash: {
type: String,
required: true
},
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const user = model('User', userSchema)

module.exports = user
