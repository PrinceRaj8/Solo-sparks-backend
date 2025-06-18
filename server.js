// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env vars from .env file
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const questRoutes = require('./routes/questRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
