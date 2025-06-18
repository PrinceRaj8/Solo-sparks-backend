const Reward = require('../models/Reward');
const User = require('../models/User');

exports.getRewards = async (req, res) => {
  const rewards = await Reward.find();
  res.json(rewards);
};

exports.redeemReward = async (req, res) => {
  const { userId, rewardId } = req.body;
  const user = await User.findById(userId);
  const reward = await Reward.findById(rewardId);

  if (user.sparkPoints >= reward.pointsRequired) {
    user.sparkPoints -= reward.pointsRequired;
    await user.save();
    res.json({ msg: "Reward redeemed!", reward });
  } else {
    res.status(400).json({ msg: "Not enough Spark Points" });
  }
};
