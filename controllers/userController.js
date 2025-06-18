const User = require('../models/User');

exports.updateMood = async (req, res) => {
  const { userId, mood } = req.body;
  const user = await User.findById(userId);
  user.mood = mood;
  await user.save();
  res.json({ msg: "Mood updated", mood });
};

exports.updateProfile = async (req, res) => {
  const { userId, traits } = req.body;
  const user = await User.findById(userId);
  user.personalityTraits = traits;
  await user.save();
  res.json({ msg: "Profile updated", traits });
};
