const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { BACKEND_API, USER, REPO, CACHE_FOLDER } = require("./_settings");
const chalk = require("chalk");

async function fetchNovel(novel) {
  const res = await fetch(`${BACKEND_API}/novel?name=${novel}`);
  let meta = await res.json();

  let folder = path.resolve(CACHE_FOLDER, `./.publish`);
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  folder = path.resolve(folder, `./${novel}`);
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  fs.writeFileSync(folder + "/metadata.json", JSON.stringify(meta));

  console.log(chalk.bold.greenBright("[ProgNovel] ") + "Successfully fetch metadata from backend.");

  await fetchNovelCovers(meta, novel, folder);

  return meta;
}

async function fetchNovelCovers(meta, novel, folder) {
  console.log(chalk.bold.greenBright(`[ProgNovel:${novel}] `) + "Fetching novel covers...");
  await Promise.all([
    fetchAndWrite(meta.cover.book.webp["1x"], novel, folder),
    fetchAndWrite(meta.cover.book.webp["2x"], novel, folder),
    fetchAndWrite(meta.cover.book.webp["3x"], novel, folder),
    fetchAndWrite(meta.cover.book.jpeg["1x"], novel, folder),
    fetchAndWrite(meta.cover.book.jpeg["2x"], novel, folder),
    fetchAndWrite(meta.cover.book.jpeg["3x"], novel, folder),
    fetchAndWrite(meta.cover.thumbnail.webp, novel, folder),
    fetchAndWrite(meta.cover.thumbnail.jpeg, novel, folder),
  ]);
}

async function fetchAndWrite(coverUrl, novel, folder) {
  const rawUrl = `https://raw.githubusercontent.com/${USER}/${REPO}/master/novels/${novel}/.publish/cover`;

  const res = await fetch(rawUrl + coverUrl);
  // console.log("Fetching cover:", rawUrl + coverUrl);
  // console.log("-- and saved at", folder);
  // console.log("It's content type is", res.headers.get("content-type"));
  // console.log(chalk.bold.greenBright(`[ProgNovel:${novel}] `) + "Fetching novel covers...");
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(folder + coverUrl, buffer);
}

module.exports = fetchNovel;
