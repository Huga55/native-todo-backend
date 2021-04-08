const express = require("express");
const authRouter = express.Router();
const path = require("path");
const authMiddleware = require(path.join(__dirname, "..", "middlewares", "authMiddleware"));
const authController = require(path.join(__dirname, "..", "controllers", "authController"));

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.register);
authRouter.use(authMiddleware);
authRouter.get("/check", authController.check);

module.exports = authRouter;