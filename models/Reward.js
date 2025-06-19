const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pointsRequired: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ['profile_boost', 'hidden_content', 'exclusive'],
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reward', RewardSchema);
