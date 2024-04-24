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

// Handle form submission
app.post('/signup', async (req, res) => {
  try {
    // Extract form data from the request body
    const { 'first-name': fullName, email, 'new-password': password, age, referrer } = req.body;

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


// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Other routes if needed

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
