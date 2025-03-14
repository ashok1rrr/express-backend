const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        
        
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user', error });
    }
};

const login = async (req, res) => {    
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {        
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
        { 
            id: user._id, 
            email: user.email 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );

    res.cookie('authToken', token, { httpOnly: true, secure: false, maxAge: 3600000 }); 
    res.json({
        accessToken : token,
        message: 'Logged in successfully',
        user: user
    });
};

const changePassword = async (req, res) => {
    const { currentPassword, newPassword, reEnterPassword } = req.body;

    if (!currentPassword || !newPassword || !reEnterPassword) {
        return res.status(400).json({ error: 'Current password, new password, and re-entered password are required' });
    }

    if (newPassword !== reEnterPassword) {
        return res.status(400).json({ error: 'New password and re-entered password must match' });
    }

    try {
        const user = await User.findById(req.user.id);

        const isMatch = await user.isPasswordMatch(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error changing password', error });
    }
};

module.exports = {
    register,  
    login,
    changePassword
}
