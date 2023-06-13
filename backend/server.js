const express = require("express");
const app = express();
app.use(
    express.urlencoded({ extended: true })
);
const cardRoutes = require("./router/card");
require("dotenv").config();
const cors = require("cors");
app.use(cors())
const mongoConnect = require("./config/db"); 
mongoConnect();
app.use(express.json({extended: false}));
app.get("/", (req,res)=> res.send("server getup running..."));
app.use("/cards", cardRoutes);
const port = process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
});