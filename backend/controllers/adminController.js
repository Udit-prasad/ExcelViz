const User = require('../models/User');
const Analysis = require('../models/Analysis');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

const getAllAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find().populate('user', 'name email');
    res.json(analyses);
  } catch (err) {
    res.status(500).send('Server error');
  }
};

module.exports = {
  getAllUsers,
  getAllAnalyses
};