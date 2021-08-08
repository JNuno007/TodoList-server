const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const isValidToken = require("./middleware/isAuth");

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
const taskRouter = require("./routers/task");
const userLoggedRouter = require("./routers/userLogged");

app.use("/login", loginRouter);
app.use("/project", isValidToken, projectRouter);
app.use("/task", isValidToken, taskRouter);
app.use("/isUserLogged", userLoggedRouter);

let server = http.createServer(app);

server.listen(port, () => {
  console.log("server running at " + port);
});

module.exports = app;
