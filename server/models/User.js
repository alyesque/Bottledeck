const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, default: "no username" },
  password: { type: String, default: "no password" },
  email: { type: String },
  decks: { type: Array },
  bio: { type: String, default: "Please enter a custom bio" },
  favoriteCards: { type: Array },
  favoriteDecks: { type: Array },
});

module.exports = mongoose.model("User", UserSchema);
