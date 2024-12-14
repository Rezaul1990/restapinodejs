const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//Routers Import
const contactRoute=require('./api/routes/contact')
const userRoute=require('./api/routes/user')
const studentRoute = require('./api/routes/student');


mongoose.connect(
    "mongodb+srv://rezaul:rezaul1990@cluster0.eorgy.mongodb.net/crud",
).then(() => {
    console.log("Connected to MongoDB successfully!");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


const app = express()

app.use(morgan('dev'))
// Middleware to parse incoming requests
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
// Middleware: Enable CORS
app.use(cors());

 // Serve uploaded files statically
app.use('/uploads', express.static('uploads'));




// Use the environment variable or default to port 3000
const PORT = process.env.PORT || 3000;
//Contact Route
app.use('/api/contacts',contactRoute);
//users Route
app.use('/api/users',userRoute);
// Student Routes
app.use('/api/students', studentRoute);

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


