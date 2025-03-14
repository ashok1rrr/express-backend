// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// dotenv.config();

// const verifyToken = (req, res, next) => {
    
//     const token = req.cookies.authToken;

//     if (!token) {
//         return res.status(403).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
        
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; 
//         next();  
//     } catch (err) {
//         return res.status(400).json({ message: 'Invalid token' });
//     }
// };

// module.exports = verifyToken;

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
    const token = req.cookies.authToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ error: "Authentication required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify JWT token
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        
        req.user = user;  // Attach the authenticated user to the request object
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

module.exports = verifyToken;

