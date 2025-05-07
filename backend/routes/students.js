const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get current student data
router.get('/me', async (req, res) => {
    try {
        const student = await Student.findById(req.studentId)
            .select('-password');
            
        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }
        
        res.json({ success: true, student });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;