const chalk = require("chalk");
const { resolve } = require("path");
const { writeFileSync } = require("fs");
const { CACHE_FOLDER } = require("../_shared");

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

const pinataCachePath = CACHE_FOLDER + "/pinata-meta.json";
const prognovelPath = resolve(__dirname, "../../../src/node_modules/prognovel");
const ipfsLogPrefix = chalk.bold.blue("[IPFS]:");

function getPrefix(folder, timestamp, initial = "") {
  return `${initial}[${folder}] - ${timestamp}`;
}

function checkPinataAPIKey() {
  if (PINATA_API_KEY && PINATA_SECRET_KEY) {
    return setPinataStatus(true);
  }

  if (PINATA_API_KEY) {
    console.error(ipfsLogPrefix, chalk.bold.red("PINATA_SECRET_KEY not found!"));
  } else if (PINATA_SECRET_KEY) {
    console.error(ipfsLogPrefix, chalk.bold.red("PINATA_API_KEY not found!"));
  }

  return setPinataStatus(false);

  function setPinataStatus(state) {
    const stateFile = CACHE_FOLDER + "/pinata.js";
    writeFileSync(stateFile, `export const usePinata = ${state};`);
    return state;
  }
}

module.exports = {
  checkPinataAPIKey,
  pinataCachePath,
  prognovelPath,
  ipfsLogPrefix,
  getPrefix,
};
