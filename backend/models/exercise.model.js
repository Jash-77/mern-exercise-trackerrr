const mongoose = require('mongoose');

// Define the schema for the data model
const exerciseSchema = new mongoose.Schema({
  username: {type: String, required: true },
  description: {type: String, required: true },
  duration: {type: Number, required: true },
  date: {type: Date, required: true },
},{
    timestamps: true,
});

// Export the schema as a Mongoose model
module.exports = mongoose.model('Exercise', exerciseSchema);
