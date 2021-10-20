const express = require("express");
const router = express.Router();
const Categories = require("../models/categories");
const mongoose = require("mongoose");
const protected = require("../middleware/protected");

router.post("/create", protected, async (req, res) => {
  const categories = Categories({
    name: req.body.name,
    description: req.body.description,
  });

  await categories.save();
  res.send(categories);
});

router.get("/", async (req, res) => {
  const categories = await Categories.find();
  res.send(categories);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.sendStatus(404);
  }

  const category = await Categories.findById(req.params.id);
  res.send(category);
});

module.exports = router;
