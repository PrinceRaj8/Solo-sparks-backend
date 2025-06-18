const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mood: String,
  personalityTraits: [String],
  sparkPoints: { type: Number, default: 0 },
  completedQuests: [{
    questId: String,
    reflectionText: String,
    reflectionImage: String,
    reflectionAudio: String,
    completedAt: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
