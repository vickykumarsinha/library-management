const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

exports.register = async (req, res) => {
  try {
    const { name, password, email, mobile } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, password: hashedPassword, email, mobile });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
