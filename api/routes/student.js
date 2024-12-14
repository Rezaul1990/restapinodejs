const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const studentController=require('../controllers/student');

// GET all students
router.get('/', studentController.getAllStudents);

// POST create a new student with file upload
router.post('/', upload.single('photo'), studentController.createStudent);

// GET a single student by ID
router.get('/:id', studentController.getStudentById);

// PUT update a student by ID (with optional file upload)
router.put('/:id', upload.single('photo'), studentController.updateStudent);

// DELETE a student by ID
router.delete('/:id', studentController.deleteStudent);

module.exports = router;