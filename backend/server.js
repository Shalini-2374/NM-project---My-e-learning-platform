require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
console.log('MongoDB URI:', process.env.MONGO_URI); // Log the MongoDB URI
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
app.use('/api/auth', authRoutes); // Ensure this line is present
const courseRoutes = require('./routes/courseRoutes');
app.use('/api/courses', courseRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
