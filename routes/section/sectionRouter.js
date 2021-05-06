const express = require("express");
const sectionRouter = express.Router();
const path = require("path");
const authMiddleware = require(path.join(__dirname, "..", "..", "middlewares", "authMiddleware"));
const sectionController = require(path.join(__dirname, "..", "..", "controllers", "sectionController"));
const { createValidation, changeValidation } = require(path.join(__dirname, "sectionRouter.validate"));

sectionRouter.use(authMiddleware);
sectionRouter.get("/", sectionController.getAll);
sectionRouter.get("/:type/:id", sectionController.getOne);
sectionRouter.post("/:type/", createValidation, sectionController.create);
sectionRouter.put("/:type/", changeValidation, sectionController.change);
sectionRouter.delete("/:type/:id", sectionController.delete);

module.exports = sectionRouter;