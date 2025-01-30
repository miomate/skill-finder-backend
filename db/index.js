const mongoose = require("mongoose");

// ℹ️ MongoDB URI setup (using environment variable for production or fallback to local)
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/restAPI";

const withDB = async (serverListener) => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log(
      `Connected to Mongo! Database name: "${connection.connections[0].name}"`
    );
    if (typeof serverListener === "function") {
      serverListener();
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    console.error("Mongo URI:", MONGO_URI); // Log the URI to check if it's correct
    process.exit(1); // Optional: exit the process if MongoDB connection fails
  }
};

module.exports = withDB;

// // ℹ️ package responsible to make the connection with mongodb
// // https://www.npmjs.com/package/mongoose
// const mongoose = require('mongoose')

// // ℹ️ Sets the MongoDB URI for our app to have access to it.
// // If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

// const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/restAPI'

// const withDB = async serverListener => {
//   try {
//     const x = await mongoose.connect(MONGO_URI)
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//     if (typeof serverListener === 'function') {
//       serverListener()
//     }
//   } catch (error) {
//     console.error('Error connecting to mongo: ', error)
// }
// }

// module.exports = withDB
