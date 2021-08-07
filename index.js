const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PWD,
  })
  .then(() => {
    console.log("Mongo Database connected");
  })
  .catch(() => {
    console.log("Error connecting to the database");
    process.exit();
  });

// Routers

const loginRouter = require("./routers/login");
const projectRouter = require("./routers/project");

app.use("/login", loginRouter);
app.use("/project", projectRouter);

let server = http.createServer(app);

server.listen(port, () => {
  console.log("server running at " + port);
});
