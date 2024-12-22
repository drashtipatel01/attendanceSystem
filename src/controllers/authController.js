const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ statusCode: 400, message: 'User already exists' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ statusCode: 400, message: 'password and confirm password should be same' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();
        console.log('login successful');
        res.status(200).json({ statusCode: 200, message: 'User registered successfully' });
    } catch (error) {
        console.log('login err', error);
        res.status(500).json({ statusCode: 500, error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '365d' 
        });

        res.status(200).json({ statusCode: 200, message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ statusCode: 500, error: error.message });
    }
};

module.exports = { registerUser, loginUser };
