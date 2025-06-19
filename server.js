const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

// Connect to MongoDB
connectDB();

const authRoutes = require('./routes/authRoutes');
const questRoutes = require('./routes/questRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// CORS setup for frontend with credentials
app.use(cors({
  origin: 'https://solo-sparks-frontend-tpt6.vercel.app',
  credentials: true,
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.send('🔥 Solo Sparks Backend Running');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(colors.green(`✅ Server running on port ${PORT}`));
});
