const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: 6,
    },
    mood: { type: String, default: "Neutral" },
    moodLogs: [{ date: String, moodScore: Number }],
    personalityTraits: { type: [String], default: [] },
    preferences: { type: [String], default: [] },
    sparkPoints: { type: Number, default: 0 },
    completedQuests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quest" }],
    reflections: [
      {
        questId: { type: mongoose.Schema.Types.ObjectId, ref: "Quest" },
        text: String,
        imageUrl: { type: String, default: "" },
        audioUrl: { type: String, default: "" },
        date: { type: Date, default: Date.now },
      },
    ],
    rewardsUnlocked: { type: [String], default: [] },
    profileBoost: { type: Boolean, default: false },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Password Hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match Password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
