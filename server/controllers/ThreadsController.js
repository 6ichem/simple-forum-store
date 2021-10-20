const express = require("express");
const router = express.Router();
const Threads = require("../models/threads");
const mongoose = require("mongoose");
const protected = require("../middleware/protected");

router.post("/create", protected, async (req, res) => {
  const threads = Threads({
    name: req.body.name,
    author: req.body.author,
    content: req.body.content,
    categoryId: req.body.categoryId,
  });

  await threads.save();
  res.send(threads);
});

router.get("/", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.query.categoryId)) {
    return res.sendStatus(404);
  }

  const threads = await Threads.find({ categoryId: req.query.categoryId });
  res.send(threads);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.sendStatus(404);
  }

  const thread = await Threads.findById(req.params.id);
  res.send(thread);
});

module.exports = router;
