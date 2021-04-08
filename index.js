const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const authMiddleware = require(path.join(__dirname, "middlewares", "authMiddleware"));

//cors
app.use(cors());
app.options("*", cors());

//for post queries
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const authRouter = require(path.join(__dirname, "routes", "authRouter"));
const sectionRouter = require(path.join(__dirname, "routes", "sectionRouter"));

app.use("/", authRouter);
app.use(authMiddleware);
app.use("/section", sectionRouter);

const PORT = process.env.PORT || 3000;
mongoose.connect("mongodb://localhost:27017/todosdb", {useUnifiedTopology: true}, function(err) {
    if(err) throw err;
    app.listen(PORT)
})



