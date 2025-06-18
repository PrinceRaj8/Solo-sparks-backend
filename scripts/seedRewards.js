const mongoose = require('mongoose');
const Reward = require('../models/Reward');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const rewards = [
      { title: 'Profile Boost', pointsRequired: 20, type: 'profile_boost' },
      { title: 'Unlock Hidden Prompt', pointsRequired: 30, type: 'hidden_content' },
      { title: 'Exclusive Reflection Guide', pointsRequired: 50, type: 'exclusive' }
    ];
    await Reward.insertMany(rewards);
    console.log("Rewards seeded!");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
