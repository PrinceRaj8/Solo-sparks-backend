const Quest = require('../models/Quest');
const User = require('../models/User');
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
    const { questId, reflectionText } = req.body;
    const user = await User.findById(req.user.id);
    let imageUrl = "", audioUrl = "";

    if (req.files?.image) {
      const imageResult = await cloudinary.uploader.upload(req.files.image.tempFilePath);
      imageUrl = imageResult.secure_url;
    }

    if (req.files?.audio) {
      const audioResult = await cloudinary.uploader.upload(req.files.audio.tempFilePath, { resource_type: "video" });
      audioUrl = audioResult.secure_url;
    }

    // Save inside `reflections` array (embedded)
    user.reflections.push({
      questId,
      text: reflectionText,
      imageUrl,
      audioUrl,
      date: new Date(),
    });

    user.completedQuests.push(questId);
    user.sparkPoints += 10;
    await user.save();

    res.json({ msg: "Quest completed!", sparkPoints: user.sparkPoints });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
