const express = require("express");
const authRouter = express.Router();
const path = require("path");
const authMiddleware = require(path.join(__dirname, "..", "..", "middlewares", "authMiddleware"));
const authController = require(path.join(__dirname, "..", "..", "controllers", "authController"));
const { loginValidate } = require("./authRouter.validate");

authRouter.post("/login", loginValidate, authController.login);
authRouter.post("/register", loginValidate, authController.register);
authRouter.use(authMiddleware);
authRouter.get("/check", authController.check);
authRouter.put("/logout", authController.logout);

module.exports = authRouter;