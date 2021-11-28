const path = require("path");
const fs = require("fs");

const PUBLISH_FOLDER = path.resolve(__dirname, "../../static/");
const SAPPER_EXPORT_FOLDER = path.resolve(__dirname, "../../__sapper__/export/");
const CACHE_FOLDER = path.resolve(__dirname, "../../.cache/");

function checkCacheFolderExist() {
  if (!fs.existsSync(CACHE_FOLDER)) fs.mkdir(CACHE_FOLDER);
}

module.exports = {
  PUBLISH_FOLDER,
  CACHE_FOLDER,
  SAPPER_EXPORT_FOLDER,
  checkCacheFolderExist,
};
