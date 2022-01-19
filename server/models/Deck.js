const mongoose = require("mongoose");

const DeckScheme = new mongoose.Schema({
  username: { type: String, required: true, default: "no username" },
  userId: { type: String, required: true, default: "no user ID" },
  cards: { type: Array, required: true, default: [] },
  tags: { type: Array, required: true, default: [] },
  deckname: { type: String, required: true, default: "untitled" },
  description: {
    type: String,
    required: true,
    default: "no description entered",
  },
});

module.exports = mongoose.model("Deck", DeckScheme);
