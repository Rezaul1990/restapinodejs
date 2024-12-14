const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerController =  async (req, res, next) => {
    try {
        // Hash the password with 10 salt rounds
        const hash = await bcrypt.hash(req.body.password, 10);

        // You can save the user to the database here (mock example):
        const newUser = new User({
            email: req.body.email,
            password: hash,
        });

        await newUser.save(); // Save the user in the database

        res.json({
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const getAllUsersController = async (req, res, next) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        res.status(200).json({
            users,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
};

const loginController=async(req,res,next)=>{
let email = req.body.email;
let password = req.body.password;

User.findOne({ email: email })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.json({
                        message: 'Error Occurred',
                    });
                }
                if (result) {
                    let token = jwt.sign(
                        { email: user.email, _id: user._id },
                        'SECRET',
                        { expiresIn: '2h' }
                    );
                    res.json({
                        message: 'Login Successful',
                        token,
                    });
                } else {
                    res.json({
                        message: 'Login Failed. Password Incorrect',
                    });
                }
            });
        } else {
            res.json({
                message: 'User Not Found',
            });
        }
    })
    .catch(error => {
        res.json({
            error: error,
        });
    });
}



module.exports = {
    registerController,
    getAllUsersController,
    loginController
};