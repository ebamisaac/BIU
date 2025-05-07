const express = require('express');
const router = express.Router();
const Class = require('../models/Class');
const Student = require('../models/Student');

// Get all classes for a student
router.get('/', async (req, res) => {
    try {
        const student = await Student.findById(req.studentId).populate('classes');
        res.json({ success: true, classes: student.classes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get specific class details
router.get('/:classId', async (req, res) => {
    try {
        const classData = await Class.findById(req.params.classId)
            .populate('teacher', 'name')
            .populate('updates');
            
        if (!classData) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }
        
        res.json({ success: true, class: classData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;