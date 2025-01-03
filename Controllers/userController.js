const User = require('../Models/User');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password from the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};
