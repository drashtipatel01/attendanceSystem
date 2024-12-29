const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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

const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like Outlook, Yahoo, etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
    },
});

// Forgot Password with OTP
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ statusCode: 404, message: 'User not found' });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store hashed OTP in the database with an expiry
        const hashedOTP = await bcrypt.hash(otp, 10);
        user.resetPasswordToken = hashedOTP;
        user.resetPasswordExpires = Date.now() + 300000; // OTP valid for 5 minutes
        await user.save();

        // Send the OTP via email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}. This OTP is valid for 5 minutes.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            statusCode: 200,
            message: 'OTP sent to your email. Please check your inbox.',
        });
    } catch (error) {
        console.error('Forgot Password Error:', error);
        res.status(500).json({ statusCode: 500, error: error.message });
    }
};

// Verify OTP and Reset Password
const changePassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ statusCode: 404, message: 'User not found' });
        }

        if (!user.resetPasswordToken || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ statusCode: 400, message: 'OTP has expired' });
        }

        const isOtpValid = await bcrypt.compare(otp, user.resetPasswordToken);
        if (!isOtpValid) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid OTP' });
        }

        // Update the password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ statusCode: 200, message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change Password Error:', error);
        res.status(500).json({ statusCode: 500, error: error.message });
    }
};


module.exports = { registerUser, loginUser, forgotPassword, changePassword };