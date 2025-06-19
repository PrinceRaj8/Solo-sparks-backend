const Reward = require('../models/Reward');
const User = require('../models/User');

exports.getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.redeemReward = async (req, res) => {
  try {
    const { rewardId } = req.body;
    const user = await User.findById(req.user.id);
    const reward = await Reward.findById(rewardId);

    if (!reward) return res.status(404).json({ msg: "Reward not found" });
    if (user.sparkPoints < reward.cost) {
      return res.status(400).json({ msg: "Not enough Spark Points" });
    }

    user.sparkPoints -= reward.cost;
    user.rewardsUnlocked.push(reward._id.toString());
    await user.save();

    res.json({ msg: "Reward redeemed!", reward });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
