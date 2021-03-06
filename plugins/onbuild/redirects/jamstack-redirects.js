import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const buildFolder = "build";
let BACKEND_API = process.env.BACKEND_API || "";

console.log("ENV Netlify", process.env.NETLIFY);

const redirectsFile = join(buildFolder, "_redirects");

if (BACKEND_API.endsWith("/")) BACKEND_API.slice(0, -1);
// const redirectsContent = readFileSync(redirectsFile, "utf-8");

writeFileSync(
  redirectsFile,
  `${process.env.NETLIFY ? "/read/* /read?load=:splat" : "/read/:slug /read?load=:slug"}
${
  process.env.NETLIFY
    ? "/discussions/* /discussions?load=:splat"
    : "/discussions/:slug /discussions?load=:slug"
}
${process.env.NETLIFY ? "/news/* /news?load=:splat" : "/news/:slug /news?load=:slug"}
/feed/* ${BACKEND_API}feed?novel=:splat 200
/chapter-list/* ${BACKEND_API}chapter-list?novel=:splat 200
`,
  "utf-8",
);

// if (process.env.NETLIFY) {
// } else if (process.env.VERCEL) {
//   const vercelConfig = require("../../../vercel.json");

//   vercelConfig.rewrites = [
//     {
//       source: "/read/:load*",
//       destination: "/read?load=:load*",
//     },
//     {
//       source: "/feed/:splat*",
//       destination: `${new URL(backend_api).href}feed?novel=:splat*`,
//     },
//     {
//       source: "/chapter-list/:splat*",
//       destination: `${new URL(backend_api).href}chapter-list?novel=:splat*`,
//     },
//   ];

//   writeFileSync("vercel.json", JSON.stringify(vercelConfig, null, 2), "utf-8");
// }
