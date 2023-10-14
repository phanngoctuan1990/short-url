"use strict";

const mongoose = require("mongoose");
const { MONGO_USERNAME, MONGO_PASSWORD, DB_HOST, DB_PORT, DB_NAME, NODE_ENV } =
  process.env;

const connectStr = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    if (NODE_ENV === "dev") {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectStr, { maxPoolSize: 50 })
      .then((_) => {
        console.log("Connected MongoDB Success");
      })
      .catch((err) => console.error(`Connect error ${err}`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
