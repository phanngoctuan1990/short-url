"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const linkController = require("../../controllers/link.controller");
const router = express.Router();

router.get("/link", asyncHandler(linkController.getAllLinks));
router.post("/link/create-short", asyncHandler(linkController.createShortLink));
router.delete("/link/clear-all", asyncHandler(linkController.clearAll));

module.exports = router;
