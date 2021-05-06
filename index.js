const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const authMiddleware = require(path.join(__dirname, "middlewares", "authMiddleware"));
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const config = require("config");

//add swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'React Native Todo',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*/*.swagger.js'],
}
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//cors
app.use(cors());
app.options("*", cors());

//for post queries
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
const authRouter = require(path.join(__dirname, "routes", "auth", "authRouter"));
const sectionRouter = require(path.join(__dirname, "routes", "section", "sectionRouter"));

app.use("/auth", authRouter);
app.use("/section", sectionRouter);

//404
app.use(function(req, res) {
    return res.status(404).send({success: false, error: "Данной страницы не существует"});
})

//server and mongodb
const PORT = config.get("PORT") || 3000;
mongoose.connect("mongodb://localhost:27017/todosdb", {useUnifiedTopology: true, useNewUrlParser: true}, function(err) {
    if(err) throw err;
    app.listen(PORT)
})



