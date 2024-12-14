const Student = require('../models/Student');

// Get All Students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving students', error: error.message });
    }
};

// Create New Student
const createStudent = async (req, res) => {
    try {
        const { name, email } = req.body;
        const photo = req.file ? req.file.path : null;

        const newStudent = new Student({
            name,
            email,
            photo,
        });

        const savedStudent = await newStudent.save();
        res.status(201).json({ message: 'Student created successfully', savedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error: error.message });
    }
};

// Get Single Student by ID
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving student', error: error.message });
    }
};

// Update Student
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (req.file) updates.photo = req.file.path;

        const updatedStudent = await Student.findByIdAndUpdate(id, updates, {
            new: true, // Return updated document
            runValidators: true, // Ensure validation rules are applied
        });

        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student updated successfully', updatedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error: error.message });
    }
};

// Delete Student
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully', deletedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
};

module.exports = {
    getAllStudents,
    createStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
};