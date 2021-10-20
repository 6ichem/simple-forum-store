const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema(
  {
    name: String,
    description: String,
  },
  { timestamps: true }
);

const Categories = mongoose.model("Categories", CategoriesSchema);
module.exports = Categories;
