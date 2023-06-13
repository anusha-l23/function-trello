const express = require("express");
const router = express.Router();
const {getCards, addCard, updateCard, deleteCard} = require("../controllers/card");
router.get("/", getCards);
router.post("/add", addCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

module.exports = router;