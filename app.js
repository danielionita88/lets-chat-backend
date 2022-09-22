const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const {errorHandler} = require('./middleware/errorMiddleware')

const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postRoutes");

dotenv.config()
mongoose.connect(process.env.MONGO_URL)

const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.use(errorHandler)

app.listen(8080);
