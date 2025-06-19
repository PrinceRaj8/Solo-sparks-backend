const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const createDefaultUser = async () => {
  const email = 'test@solo.com';

  const existing = await User.findOne({ email });
  if (existing) return console.log('✅ Default test user already exists');

  const hashedPassword = await bcrypt.hash('Test@1234', 10);

  const user = new User({
    name: 'Test User',
    email,
    password: hashedPassword,
  });

  await user.save();
  console.log('🚀 Default test user created: test@solo.com / Test@1234');
};

module.exports = createDefaultUser;
