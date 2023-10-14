"use strict";

const { pick } = require("lodash");

const getInfoData = ({ fields = [], object = {} }) => pick(object, fields);

module.exports = { getInfoData };
