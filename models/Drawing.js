const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DrawingSchema = new Schema({
  drwnum: {
    type: String,
    required: true
  },
  revision: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = Drawing = mongoose.model('drawings', DrawingSchema);
