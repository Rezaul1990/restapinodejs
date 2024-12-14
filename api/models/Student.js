const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: (email) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
            message: `{VALUE} is not a valid email!`,
        },
    },
    photo: {
        type: String, // Path or URL of the uploaded photo
        required: false,
    },
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;