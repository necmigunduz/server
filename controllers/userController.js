const User = require('../models/user');

exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    const result = await user.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUserById = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
