const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  type: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
  traits: { type: [String], default: [] }, // personality traits this quest targets
  rewardPoints: { type: Number, default: 10 }, // points earned on completion
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quest', QuestSchema);
