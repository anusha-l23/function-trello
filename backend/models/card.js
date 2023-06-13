const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
    card: {
        type: String,
        required: true
    }
}, {collection: "cards"});

const Card = mongoose.model("card", cardSchema);
module.exports = Card;