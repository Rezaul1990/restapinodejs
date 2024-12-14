const Contact = require('../models/Contact');

const getAllContactsController=(req, res, next) => {
    Contact.find()
        .then(contacts => {
            res.status(200).json(contacts);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error retrieving contacts', error: err });
        });
}

const newContactController=(req, res, next) => {
    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
    });

    contact.save()
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Error saving contact', error: err });
        });
}

const getSingleContactController=async(req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id); // Find by ID
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const updateContactController=async (req, res,next) => {
    try {
        const { id } = req.params;
        const updates = req.body; // Updated fields in request body

        // Find the contact by ID and update
        const updatedContact = await Contact.findByIdAndUpdate(id, updates, {
            new: true, // Return the updated document
            runValidators: true, // Ensure updates match schema validations
        });

        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact updated successfully", updatedContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


const deleteContactController=async (req, res,next) => {
    try {
        const { id } = req.params;

        // Find the contact by ID and delete
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json({ message: "Contact deleted successfully", deletedContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}




module.exports={
    getAllContactsController,
    newContactController,
    getSingleContactController,
    updateContactController,
    deleteContactController
}