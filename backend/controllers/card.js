const Card = require("../models/card");
exports.getCards = (req, res) => {
  Card.find()
    .then((card) => res.status(200).json(card))
    .catch((err) =>
      res.status(404).json({ message: "Cards not found", error: err.message })
    );
};

exports.addCard = (req, res) => {

  const card = new Card({
    card: req.body.card,
    });
    card.save()
    .then((card) =>
      res.status(200).json({ message: "Card created successfully", card })
    )
    .catch((err) =>
      res.status(404).json({ message: "card not created", error: err.message })
    );
};

exports.updateCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, req.body)
    .then((card) =>
      res.status(200).json({ message: "Card updated successfully", card })
    )
    .catch((err) =>
      res.status(404).json({ message: "card not updated", error: err.message })
    );
};

exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.id)
    .then((data) =>
      res.status(200).json({ message: "card deleted successfully" })
    )
    .catch((err) =>
      res.status(404).json({ message: "card not deleted", error: err.message })
    );
};
