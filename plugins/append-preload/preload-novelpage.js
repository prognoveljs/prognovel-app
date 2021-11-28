const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
const { novels } = require("../../.cache/assets/publish/sitemetadata.json");

const PRELOADED_NOVEL_NUMBER = 3;
const buildPath = path.resolve(__dirname, "../../__sapper__/export/novel/");

module.exports = () => {
  const homepage = readFileSync(buildPath + "/index.html").toString("utf-8");
  const heroNovels = novels.slice(0, PRELOADED_NOVEL_NUMBER);
  console.log(heroNovels);
};
