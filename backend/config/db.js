const mongoose = require("mongoose");

const db = process.env.MONGO_URI;
const mongoConnect = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoConnect;
