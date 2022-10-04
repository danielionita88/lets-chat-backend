const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

const { errorHandler } = require("./middleware/errorMiddleware");

const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const postsRoutes = require("./routes/postRoutes");
const s3Routes = require("./routes/s3Routes")

dotenv.config();
connectDB();

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
app.use("/api/posts", postsRoutes);
app.use("/api/s3Url",s3Routes)

app.use(errorHandler);

app.listen(8080);
