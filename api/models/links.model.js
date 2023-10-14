"use strict";

const { Schema, model } = require("mongoose");

const DOCUMENT_LINK_NAME = "Link";
const COLLECTION_LINK_NAME = "Links";

// Declare the Schema of the Mongo model
const linksSchema = new Schema(
  {
    longurl: {
      type: String,
      required: true,
    },
    shorturl: {
      type: String,
      required: true,
      unique: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, collection: COLLECTION_LINK_NAME }
);

module.exports = model(DOCUMENT_LINK_NAME, linksSchema);
