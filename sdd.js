// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000; // or any port you prefer

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Project')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get("")
// Other routes if needed

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
