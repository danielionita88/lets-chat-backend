const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("connected to DB");
});

const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"))
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.use("/posts", postsRoutes);

app.listen(8080);
