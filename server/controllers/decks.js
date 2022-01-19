const Deck = require("../models/Deck");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const getAllDecks = async (req, res) => {
  try {
    const decks = await Deck.find({});
    res.status(200).json({ decks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getDeck = async (req, res) => {
  try {
    const { id: deckId } = req.params;
    const deck = await Deck.findOne({ _id: deckId });
    if (!deck) {
      return res.status(404).json({ msg: `no message with ID: ${deckId}` });
    }
    res.status(200).json({ deck });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createDeck = async (req, res) => {
  try {
    // let newReq = JSON.parse(req.body.body);

    // const deck = await Deck.create({
    //   username: newReq.username,
    //   userId: newReq.userId,
    //   cards: newReq.cards,
    //   tags: newReq.tags,
    //   descriptio: newReq.description,
    //   deckname: newReq.deckname,
    // });

    const deck = await Deck.create({
      username: req.body.username,
      userId: req.body.userId,
      cards: req.body.cards,
      tags: req.body.tags,
      description: req.body.description,
      deckname: req.body.deckname,
    });

    res.status(201).json({ deck });
  } catch (error) {
    res.status(500).json({ msg: error });
    console.log(error);
  }
};
module.exports = {
  getAllDecks,
  createDeck,
  getDeck,
};
