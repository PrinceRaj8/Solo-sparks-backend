const User = require('../models/User');

// Update user mood
exports.updateMood = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const { mood } = req.body;
    if (!mood) return res.status(400).json({ msg: "Mood is required" });

    user.mood = mood;
    await user.save();

    res.json({ msg: "Mood updated successfully", mood });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update user personality traits and preferences
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const { traits, preferences } = req.body;

    if (traits && Array.isArray(traits)) {
      user.personalityTraits = traits;
    }

    if (preferences && Array.isArray(preferences)) {
      user.preferences = preferences;
    }

    await user.save();

    res.json({
      msg: "Profile updated successfully",
      personalityTraits: user.personalityTraits,
      preferences: user.preferences,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
