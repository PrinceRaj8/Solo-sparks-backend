const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const questRoutes = require('./routes/questRoutes');
const reflectionRoutes = require('./routes/reflectionRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const errorHandler = require('./middleware/errorHandler');
const cloudinary = require('cloudinary').v2;

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/reflections', reflectionRoutes);
app.use('/api/rewards', rewardRoutes);

// Error handler middleware
app.use(errorHandler);

// Default route
app.get('/', (req, res) => {
  res.send('Solo Sparks API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
