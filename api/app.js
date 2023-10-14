require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const compression = require("compression");
const { default: helmet } = require("helmet");
const { StatusCodes, ReasonPhrases } = require("./utils/httpStatusCode");

// app.use(helmet());

app.use(morgan("dev"));
app.use(compression());
require("./dbs/init.mongodb");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", require("./routes"));

app.use((req, res, next) => {
  const error = new Error(ReasonPhrases.NOT_FOUND);
  error.status = StatusCodes.NOT_FOUND;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: error.stack,
    message: error.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
});

module.exports = app;
