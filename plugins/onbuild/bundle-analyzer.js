const { resolve, join } = require("path");
const { mkdirSync, writeFileSync, readFileSync } = require("fs");

module.exports = () => {
  const buildPath = resolve(__dirname, "../../__sapper__/export");
  const analyzerFolder = join(buildPath, "bundle-analyzer");
  mkdirSync(analyzerFolder);
  writeFileSync(
    join(analyzerFolder, "index.html"),
    readFileSync(resolve(__dirname, "../../.cache/bundle-analyzer.html"), "utf-8"),
  );
};
