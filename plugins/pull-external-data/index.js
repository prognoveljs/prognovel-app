const fs = require("fs");
const fetch = require("node-fetch");
const fetchNovel = require("./fetch-novel");
const { BACKEND_API, CACHE_FOLDER } = require("./_settings");

async function fetchSiteMetadata(utils) {
  console.log("Fetching metadata from", BACKEND_API);
  const res = await fetch(BACKEND_API);
  let metadata;

  try {
    metadata = await res.json();
  } catch (err) {
    // utils.build.failBuild(err);
  }

  return metadata;
}

function validEnv() {
  // if (!USER) throw "GITHUB_USER";
  // if (!REPO) throw "GITHUB_REPO";
}

module.exports = {
  onPreBuild: async ({ utils, constants }) => {
    try {
      // validEnv();
    } catch (err) {
      // utils.build.failBuild(`${err}`);
      const colorize = "color: darkred";
      console.log("");
      console.log("");
      console.log("");
      console.log("");
      console.log(`%c************************************`, colorize);
      console.log(`%c* %cBUILD FAILED                   `, colorize, "background: darkred; color: #fff");
      console.log(`%c*   make sure to provide ${err}`, colorize);
      console.log(`%c*   in your environment variables`, colorize);
      console.log(`%c************************************`, colorize);
    }

    let metadata = await fetchSiteMetadata(utils);

    // console.log("===== SITE METADATA ======");
    // console.log(metadata);
    // console.log("==========================");

    if (!fs.existsSync(CACHE_FOLDER)) fs.mkdirSync(CACHE_FOLDER);
    fs.writeFileSync(CACHE_FOLDER + "/sitemetadata.json", JSON.stringify(metadata));

    console.log("Found novels:", metadata.novels);

    await Promise.all(
      metadata.novels.map(async (novel) => {
        return await fetchNovel(novel);
      }),
    );
  },
};
