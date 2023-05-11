const mongoose = require('mongoose');

// Define the schema for the data model
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength:  3
  },
},{
    timestamps: true,
});

// Export the schema as a Mongoose model
module.exports = mongoose.model('User', userSchema);
