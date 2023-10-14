"use strict";

const { CREATED, OK } = require("../core/success.response");
const LinkService = require("../services/link.service");

class LinkController {
  createShortLink = async (req, res) => {
    new CREATED({
      message: "Create short link success!",
      metadata: await LinkService.createShortLink({ link: req.body.link }),
    }).send(res);
  };

  getAllLinks = async (req, res) => {
    new OK({
      metadata: await LinkService.getAllLinks(),
    }).send(res);
  };

  createRedirectionRoute = async (req, res) => {
    const longurl = await LinkService.createRedirectionRoute({
      shorturl: req.params.shorturl,
    });
    res.redirect(longurl);
  };

  clearAll = async (req, res) => {
    new OK({ metadata: await LinkService.clearAll() }).send(res);
  };
}

module.exports = new LinkController();
