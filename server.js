const express = require("express");

const zoosRouter = require("./routers/zoos-router.js");
const bearsRouter = require("./routers/bears-router.js")

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
  res.send("WEB DB CHALLENGE II! Try /api/zoos or /api/bears.");
});

server.use("/api/zoos", zoosRouter);
server.use("/api/bears", bearsRouter);


// DNE MIDDLEWARE:
server.use(function(req, res) {
  res
    .status(404)
    .send("This route does not exist! Try /api/zoos or /api/bears.");
});

module.exports = server;