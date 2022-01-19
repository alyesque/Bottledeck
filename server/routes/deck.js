const express = require("express");
const router = express.Router();

const { getAllDecks, createDeck, getDeck } = require("../controllers/decks.js");

router.route("/").get(getAllDecks).post(createDeck);
router.route("/:id").get(getDeck);

module.exports = router;
