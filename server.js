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

// ✅ Updated CORS middleware
app.use(cors({
  origin: 'https://solo-sparks.vercel.app', // replace with your deployed frontend URL
  credentials: true
}));

// ✅ Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/users', userRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(colors.green(`✅ Server running on port ${PORT}`));
});
