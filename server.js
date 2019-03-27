const express = require("express");

const cohortsRouter = require("./routers/cohorts-router.js");
const studentsRouter = require("./routers/students-router.js")

const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());

// LOGGER MIDDLEWARE:
server.use(function(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
});

// ENDPOINTS HERE:
server.get("/", (req, res) => {
  res.send("WEB DB CHALLENGE II! Try /api/cohorts or /api/students.");
});

server.use("/api/cohorts", cohortsRouter);
server.use("/api/students", studentsRouter);


// DNE MIDDLEWARE:
server.use(function(req, res) {
  res
    .status(404)
    .send("This route does not exist! Try /api/cohorts or /api/students.");
});

module.exports = server;