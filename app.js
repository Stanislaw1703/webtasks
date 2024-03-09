const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const jwtMiddleware = require('./jwtMiddleware');

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/mytaskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => console.error('Error connecting to MongoDB:', err.message));

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Protected route
app.get('/protected', jwtMiddleware, (req, res) => {
  res.send('Protected route accessed');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
