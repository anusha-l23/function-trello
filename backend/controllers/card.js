const Card = require("../models/card");
exports.getCards = (req, res) => {
  Card.find()
    .then((card) => res.status(200).json(card))
    .catch((err) =>
      res.status(404).json({ message: "Cards not found", error: err.message })
    );
};

exports.addCard = (req, res) => {
  Card.create(req.body)
    .then((data) =>
      res.status(200).json({ message: "Card created successfully", data })
    )
    .catch((err) =>
      res.status(404).json({ message: "card not created", error: err.message })
    );
};

exports.updateCard = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body)
    .then((data) =>
      res.status(200).json({ message: "Card updated successfully", data })
    )
    .catch((err) =>
      res.status(404).json({ message: "card not updated", error: err.message })
    );
};

exports.deleteCard = (req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then((data) =>
      res.status(200).json({ message: "card deleted successfully" })
    )
    .catch((err) =>
      res.status(404).json({ message: "card not deleted", error: err.message })
    );
};
