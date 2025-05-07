const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const { JWT_SECRET } = require('../config/db');

// Login
router.post('/login', async (req, res) => {
    try {
        const { studentId, password } = req.body;
        
        // Find student
        const student = await Student.findOne({ studentId });
        if (!student) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        // Create token
        const token = jwt.sign({ id: student._id }, JWT_SECRET, {
            expiresIn: req.body.rememberMe ? '7d' : '1d'
        });
        
        res.json({ 
            success: true, 
            token,
            student: {
                id: student._id,
                name: student.name,
                studentId: student.studentId
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Verify token
router.get('/verify', async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.json({ valid: false });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ valid: true, studentId: decoded.id });
    } catch (err) {
        res.json({ valid: false });
    }
});

module.exports = router;