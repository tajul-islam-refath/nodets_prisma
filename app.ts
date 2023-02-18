import express, { Express } from "express";
const app: Express = express();

const { readdirSync } = require("fs");

// import security middleware
const bodyParser = require("body-parser");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");
const hpp = require("hpp");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");

// security middleware implementation
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes middleware
readdirSync("./src/routes").map((r: any) =>
  app.use("/api/v1", require(`./src/routes/${r}`))
);

// Setup api rate limits
const limits = rateLimiter({
  windowMs: 15 * 60 * 60 * 1000,
  max: 100,
});

app.use(limits);

module.exports = app;
