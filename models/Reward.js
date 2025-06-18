const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
  title: String,
  pointsRequired: Number,
  type: { type: String, enum: ['profile_boost', 'hidden_content', 'exclusive'] },
});

module.exports = mongoose.model('Reward', RewardSchema);
