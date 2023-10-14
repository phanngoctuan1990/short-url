"use strict";

const { getInfoData } = require("../utils");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const {
  createShortLink,
  getAllLinks,
  getLinkByShortId,
  updateCountByShorturl,
  clearAll,
} = require("../models/repositories/link.repo");

class LinkService {
  static createShortLink = async ({ link }) => {
    const uniqueId = Math.random()
      .toString(36)
      .replace(/[^a-z0-9]/gi, "")
      .substr(2, 10);

    const shortLink = await createShortLink({
      longurl: link,
      shorturl: uniqueId,
    });

    if (!shortLink) {
      throw new BadRequestError("Error: Link store Error!");
    }

    return getInfoData({
      object: shortLink,
      fields: ["longurl", "shorturl", "count"],
    });
  };

  static getAllLinks = async () => await getAllLinks();

  static createRedirectionRoute = async ({ shorturl }) => {
    const { modifiedCount } = await updateCountByShorturl({ shorturl });
    if (!modifiedCount) {
      throw new BadRequestError("Error: Update Link Error!");
    }
    const foundLink = await getLinkByShortId({ shorturl });
    if (!foundLink) {
      throw new NotFoundError("Error: Link not found!");
    }
    return foundLink.longurl;
  };

  static clearAll = async () => await clearAll();
}

module.exports = LinkService;
