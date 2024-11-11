const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // Log the token for debugging purposes (after ensuring it's extracted)
    console.log("Token received:", token);
    
    if (!token) return res.status(401).json('Access denied');

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach the decoded user data to req.user

        // Check if the user exists
        const user = await User.findById(req.user.id); // Use the ID from the decoded token
        if (!user) return res.status(401).json('User not found');

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("Error in token verification:", error);
        res.status(400).json('Invalid token');
    }
};

module.exports = authMiddleware;
