const express = require('express');
const router = express.Router();
const userController=require('../controllers/user')
const authenticate = require('../middleware/authenticate');
const path = require('path');

router.post('/login', userController.loginController);

router.post('/register', userController.registerController);

// Serve the login HTML file
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

router.get('/',authenticate, userController.getAllUsersController);

module.exports = router;