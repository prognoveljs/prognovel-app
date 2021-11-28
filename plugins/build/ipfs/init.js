const { readFileSync, existsSync, mkdirSync, statSync } = require("fs");
const { pinataCachePath, prognovelPath } = require("./utils");

if (!existsSync(prognovelPath) && !statSync(prognovelPath).isDirectory()) mkdirSync(prognovelPath);

const assetsCachePath = prognovelPath + "/assets.js";

const ipfsCache = existsSync(pinataCachePath) ? JSON.parse(readFileSync(pinataCachePath)) : [];
const assetsCache = existsSync(assetsCachePath) ? readFileSync(assetsCachePath).toString() : "";

module.exports = {
  ipfsCache,
  assetsCache,
};
