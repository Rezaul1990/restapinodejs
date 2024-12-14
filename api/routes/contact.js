const express = require('express');
const router = express.Router();
const contactController=require('../controllers/contact');
const authenticate = require('../middleware/authenticate');



// Get
router.get('/',authenticate,contactController.getAllContactsController );

// Post
router.post('/',contactController.newContactController);

// PUT Route
router.put('/:id',contactController.updateContactController);

// DELETE Route
router.delete('/:id',contactController.deleteContactController);

// Single Contact Route (GET by ID)
router.get('/:id',contactController.getSingleContactController);


module.exports=router