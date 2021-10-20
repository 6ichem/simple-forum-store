const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const path = require("path");
const cors = require("cors");

require("dotenv").config();

const auth = require("./middleware/auth");

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(auth);

app.use(express.static(path.join(__dirname, "..", "client/build")));

app.use("/api/user", require("./controllers/UserController"));
app.use("/api/categories", require("./controllers/CategoriesController"));
app.use("/api/threads", require("./controllers/ThreadsController"));
app.use("/api/pay", require("./controllers/PaymentController"));

mongoose.connect(process.env.MONGO_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => console.log("Connected to DB"));

app.listen(5000, () => console.log(`Server started on port 5000`));
