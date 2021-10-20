const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const ThreadsSchema = new Schema(
  {
    name: String,
    categoryId: mongoose.ObjectId,
    author: String,
    content: String,
  },
  { timestamps: true }
);

const Threads = mongoose.model("Threads", ThreadsSchema);
module.exports = Threads;
