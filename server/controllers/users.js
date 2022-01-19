const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// get all//

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//post//

const createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(404).json({ msg: `no message with ID: ${userID}` });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(404).json({ msg: `no message with ID: ${userID}` });
    }
    res.status(200).json({
      username: user.username,
      userId: user._id,
      favoriteCards: user.favoriteCards,
      favoriteDecks: user.favoriteDecks,
      decks: user.decks,
      bio: user.bio,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getUsername = async (req, res) => {
  try {
    const { username: userID } = req.params;
    const user = await User.findOne({ username: userID });
    if (!user) {
      return res.status(404).json({ msg: `no message with ID: ${userID}` });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const login = async (req, res) => {
  try {
    const { username: userID } = req.params;
    const user = await User.findOne({ username: userID });
    if (!user) {
      return res.status(404).json({ msg: `no user with ID: ${userID}` });
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      // res.send("Success");
      const id = user.id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 84000,
      });
      res.json({
        auth: true,
        token: token,
        results: {
          userId: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } else {
      res.send("Password does not match");
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findOneAndDelete({ _id: userID });
    if (!user) {
      return res.status(404).json({ msg: `no message with ID: ${userID}` });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await User.findOneAndUpdate({ _id: userID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ msg: `no message with ID: ${userID}` });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  createUser,
  deleteUser,
  getUser,
  getUsername,
  login,
  getProfile,
};
