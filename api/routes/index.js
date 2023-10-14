"use strict";

const express = require("express");
const asyncHandler = require("../helpers/asyncHandler");
const linkController = require("../controllers/link.controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

router.get(
  "/link/:shorturl",
  asyncHandler(linkController.createRedirectionRoute)
);

router.use("/v1/api", require("./link"));

module.exports = router;
