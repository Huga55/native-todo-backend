const express = require("express");
const sectionRouter = express.Router();
const path = require("path");
const sectionController = require(path.join(__dirname, "..", "controllers", "sectionController"));

sectionRouter.get("/:type/", sectionController.getAll);
sectionRouter.get("/:type/:id", sectionController.getOne);
sectionRouter.post("/:type/", sectionController.create);
sectionRouter.put("/:type/", sectionController.change);
sectionRouter.delete("/:type/:id", sectionController.delete);

module.exports = sectionRouter;