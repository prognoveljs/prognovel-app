const globby = require("globby");
const chalk = require("chalk");
const { resolve } = require("path");
const { readFileSync, existsSync } = require("fs");

const siteMetadata = readFileSync(
  resolve(__dirname, "../../.cache/assets/publish/sitemetadata.json"),
);
const novels = ["", ...JSON.parse(siteMetadata).novels];

console.log(novels);
const logPrefix = chalk.bold.green("[HTML Page Check]:");

module.exports = {
  onPostBuild: async ({ utils, constants }) => {
    const publishFolder = constants.PUBLISH_DIR;
    console.log(publishFolder);
    for (const novel of novels) {
      if (checkHTML) {
        console.log(logPrefix, novel, "HTML page exists.");
      } else {
        utils.build.failBuild(novel, "HTML page doesn't exists.");
      }
    }
  },
};

function checkHTML(path) {
  return existsSync(path + "/index.html");
}
