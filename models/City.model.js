const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the city model to whatever makes sense in this case
const citySchema = new Schema(
  {
    city: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const City = mongoose.model("City", citySchema);

module.exports = City;
