// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const questRoutes = require('./routes/questRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// ✅ Secure & specific CORS setup for Vercel frontend
app.use(cors({
  origin: 'https://solo-sparks-frontend-tpt6.vercel.app',
  credentials: true,
}));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Optional: Root route to test backend
app.get('/', (req, res) => {
  res.send('🔥 Solo Sparks Backend Running');
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/users', userRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(colors.green(`✅ Server running on port ${PORT}`));
});
