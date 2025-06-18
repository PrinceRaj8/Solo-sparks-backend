const User = require('../models/User');
const Quest = require('../models/Quest');
const cloudinary = require('../utils/cloudinary');

exports.getTodaysQuest = async (req, res) => {
  try {
    const sample = await Quest.aggregate([{ $sample: { size: 1 } }]);
    res.json(sample[0]);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.completeQuest = async (req, res) => {
  try {
    const { userId, questId, reflectionText } = req.body;

    let imageUrl = null, audioUrl = null;

    if (req.files.image) {
      const result = await cloudinary.uploader.upload_stream({ resource_type: "image" }, () => {});
      imageUrl = result.secure_url;
    }

    if (req.files.audio) {
      const result = await cloudinary.uploader.upload_stream({ resource_type: "video" }, () => {});
      audioUrl = result.secure_url;
    }

    const user = await User.findById(userId);
    user.completedQuests.push({
      questId,
      reflectionText,
      reflectionImage: imageUrl,
      reflectionAudio: audioUrl,
      completedAt: new Date()
    });

    user.sparkPoints += 10; // reward for completion
    await user.save();

    res.json({ msg: "Quest completed!", sparkPoints: user.sparkPoints });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
