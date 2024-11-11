const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new course
router.post('/', authMiddleware, async (req, res) => { // Protect this route
    const newCourse = new Course(req.body);
    try {
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get all courses
router.get('/', authMiddleware, async (req, res) => { // Protect this route
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get a course by ID
router.get('/:id', authMiddleware, async (req, res) => { // Protect this route
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json('Course not found');
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update a course by ID
router.put('/:id', authMiddleware, async (req, res) => { // Protect this route
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCourse) return res.status(404).json('Course not found');
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete a course by ID
router.delete('/:id', authMiddleware, async (req, res) => { // Protect this route
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse) return res.status(404).json('Course not found');
        res.status(200).json('Course deleted successfully');
    } catch (error) {
        res.status(500).json(error);
    }
});

// Export the router to be used in server.js
module.exports = router;
