const path = require("path");
const { readFileSync, writeFileSync } = require("fs");
const { novels } = require("../../.cache/assets/publish/sitemetadata.json");

const PRELOADED_NOVEL_NUMBER = 3;
const buildPath = path.resolve(__dirname, "../../__sapper__/export/");
const heroNovels = novels.slice(0, PRELOADED_NOVEL_NUMBER);

function getPreload() {
  let s = "";
  heroNovels.forEach((novel) => {
    console.log("Preloading book cover for", novel);
    s += `<link rel="preload" as="image" href="/publish/${novel}/cover-256.webp" imagesrcset="/publish/${novel}/cover-256.webp 1x, /publish/${novel}/cover-512.webp 2x" imagesizes="250px">`;
  });
  return s;
}

module.exports = () => {
  let homepage = readFileSync(buildPath + "/index.html").toString("utf-8");
  writeFileSync(buildPath + "/index.html", homepage.replace("</head>", getPreload() + "</head>"));
};
