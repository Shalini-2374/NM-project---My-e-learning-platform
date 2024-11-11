const mongoose = require('mongoose');

// Define the schema for the Course model
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    author: { type: String, required: true }, // Added author field as required
    createdAt: { type: Date, default: Date.now }
});

// Create the Course model using the defined schema
const Course = mongoose.model('Course', courseSchema);

// Export the model for use in other parts of the application
module.exports = Course;
