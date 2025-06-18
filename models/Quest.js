const mongoose = require('mongoose');

const QuestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
  traits: [String], // based on personality
});

module.exports = mongoose.model('Quest', QuestSchema);
