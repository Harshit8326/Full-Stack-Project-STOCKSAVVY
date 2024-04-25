const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Project', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Add middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define a Mongoose schema for user data
const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  profilePicture: String,
  age: Number,
  referrer: String,
});

const User = mongoose.model('User', userSchema);

// Define a Mongoose schema for contact messages
const contactSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  message: String,
});

const ContactMessage = mongoose.model('ContactMessage', contactSchema);

// Handle signup form submission
app.post('/signup', async (req, res) => {
    try {
        // Extract form data from the request body
        const { fullName, email, password, age, referrer } = req.body;

        // Create a new user document
        const user = new User({
            fullName,
            email,
            password,
            age,
            referrer,
        });

        // Save the user to the database
        await user.save();

        // Redirect to a success page or another page if needed
        res.redirect('/Thanks.html');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Internal server error');
    }
});

// Handle contact form submission from index.html
app.post('/contact', async (req, res) => {
    try {
        // Extract form data from the request body
        const { fullName, email, message } = req.body;

        // Create a new contact message document
        const contactMessage = new ContactMessage({
            fullName,
            email,
            message,
        });

        // Save the contact message to the database
        await contactMessage.save();

        // Redirect to a success page or another page if needed
        res.redirect('/index.html#contact');
    } catch (error) {
        console.error('Error saving contact message:', error);
        res.status(500).send('Internal server error');
    }
});

// Handle login form submission
app.post('/login', async (req, res) => {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;

        // Check if a user with the provided email exists in the database
        const user = await User.findOne({ email });

        // If no user found with the provided email
        if (!user) {
            // Redirect to signup page with a message
            return res.status(401).redirect('/SignUp.html?error=User not found');
        }

        // Check if the provided password matches the stored password
        if (user.password !== password) {
            return res.status(401).send('Incorrect password');
        }

        // If email and password match, redirect to dashboard page
        res.redirect('/DashPage.html');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal server error');
    }
});


// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Other routes if needed

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
