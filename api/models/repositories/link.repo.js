"use strict";

const linkModel = require("../links.model");

const createShortLink = async ({ longurl, shorturl }) =>
  await linkModel.create({ longurl, shorturl });

const getAllLinks = async () =>
  await linkModel.find().select("longurl shorturl count -_id").lean();

const getLinkByShortId = async ({ shorturl }) =>
  await linkModel.findOne({ shorturl }).lean();

const updateCountByShorturl = async ({ shorturl }) =>
  await linkModel.updateOne({ shorturl }, { $inc: { count: 1 } });

const clearAll = async () => await linkModel.deleteMany({});

module.exports = {
  createShortLink,
  getAllLinks,
  getLinkByShortId,
  updateCountByShorturl,
  clearAll,
};
