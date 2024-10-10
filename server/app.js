const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const foodRoutes = require('./routes/foodRoutes');
const authRoutes = require('./routes/authRoutes').router; // Import the auth routes

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/food', foodRoutes);
app.use('/api/auth', authRoutes);

// Default route for '/'
app.get('/', (req, res) => {
  res.send('API is running...');
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/health_app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
