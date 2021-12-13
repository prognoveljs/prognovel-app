const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

if (process.env.NETLIFY) {
}

const siteMetadata = require("../../../.cache/assets/publish/sitemetadata.json");
const { backend_api } = siteMetadata;
const buildFolder = "__sapper__/export";
const redirectsFile = join(buildFolder, "_redirects");

const redirectsContent = readFileSync(redirectsFile, "utf-8");

console.log(redirectsContent);

writeFileSync(
  redirectsFile,
  redirectsContent +
    `
/feed/* ${new URL(backend_api).href}feed?novel=:splat
/chapter-list/* ${new URL(backend_api).href}chapter-list?novel=:splat
/* /404 
`,
  "utf-8",
);
