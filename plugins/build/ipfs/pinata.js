const fs = require("fs");
const globby = require("globby");
const chalk = require("chalk");
const { resolve } = require("path");
const { ipfsLogPrefix, getPrefix } = require("./utils");
const { CACHE_FOLDER } = require("../_shared");
const addSeconds = require("date-fns/addSeconds");

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;
const SITE_TITLE = process.env.SITE_TITLE || "ProgNovel App";
const PINATA_NAME_PREFIX = `[${SITE_TITLE}] - `;

const pinata = require("@pinata/sdk")(PINATA_API_KEY, PINATA_SECRET_KEY);

/**
 * Return an array of pinned assets object from Pinata SDK. **PINATA_API_KEY** and **PINATA_SECRET_KEY**
 * must be valid in environment variable.
 *
 * @param {Object | null} filter - Pinata SDK's pinList filter parameter. (read more)
 *
 *```typescript
 * await getPinnedAssets({ status: "pinned" });
 *
 * // alternatively, you can empty parameter getPinnedAssets()
 * // and use chaining functions insted
 * await getPinnedAssets().olderThan("2020-09-20T05:36:47.524Z");
 *```
 *
 *---
 *```typescript
 * getPinnedAssets().olderThan(date: Date, filter?: PinataFilterObject): void
 *```
 *
 * Returns assets on Pinata account tied with **PINATA_API_KEY** and **PINATA_SECRET_KEY**.
 *
 */
function getPinnedAssets(filter = {}) {
  const isIncludeNewestPin = JSON.stringify(filter) !== "{}";
  if (!filter.status) filter.status = "pinned";

  if (isIncludeNewestPin) {
    return new Promise((resolve, reject) => pinata.pinList(filter).then(resolve).catch(reject));
  }

  return {
    olderThan(date, filter2 = {}) {
      Object.assign(filter, filter2);
      filter.pinEnd = addSeconds(new Date(date), -1).toISOString();

      return new Promise((resolve, reject) => pinata.pinList(filter).then(resolve).catch(reject));
    },
  };
}
/**
 * Unpin older assets on Pinata account, tied to **PINATA_API_KEY** and **PINATA_SECRET_KEY** in
 * environment variable.
 *
 * @param {string} date takes date parameter in ISO format.
 * @param {*} filter Pinata filter parameter. (read more)
 */
async function unpinOlderThan(date, filter = {}) {
  try {
    const pinnedAssets = await getPinnedAssets().olderThan(date, filter);

    for (const pin of pinnedAssets.rows) {
      await pinata.unpin(pin.ipfs_pin_hash);
    }
  } catch (err) {
    console.error(ipfsLogPrefix, "Unable connecting to Pinata server.");
    // throw Error("Failed to unpin old Pinata pinned assets.");
  }
}

async function duplicateAssetsToIPFS(build) {
  // let pinataCache = fs.existsSync(pinataCachePath) ? fs.readFileSync(pinataCachePath) : null;
  // let pinataMeta;
  let IPFSMetadata = [];
  console.log(ipfsLogPrefix, "Outsourcing assets for IPFS protocol...");
  try {
    console.log(await pinata.testAuthentication(PINATA_API_KEY, PINATA_SECRET_KEY));
    // await unpinOlderThan("2020-09-20T05:36:47.524Z");
  } catch (err) {
    // throw err;
    return [];
  }

  const folders = await globby([".cache/.publish/*"], {
    dot: true,
    onlyDirectories: true,
  });

  await Promise.all(
    folders
      .filter((folder) => fs.lstatSync(folder).isDirectory())
      .map(async (folder) => {
        const novel = folder.split("/.publish/")[1];
        const result = await publishToPinata(novel);
        console.log(ipfsLogPrefix, "Saved", chalk.bold(novel) + ".");
        build.novelsToBeDuplicated.push(result);
        IPFSMetadata.push(result);

        return result;
      }),
  );

  return IPFSMetadata;
}

async function publishToPinata(novel) {
  let timestamp;
  let hash;
  const path = resolve(__dirname, "../../../.cache/.publish/" + novel);
  const name = SITE_TITLE + "assets " + new Date().toUTCString();
  const options = {
    pinataMetadata: {
      name,
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  try {
    const result = await pinata.pinFromFS(PINATA_API_KEY, PINATA_SECRET_KEY, path, options);
    console.log(result);
    try {
      hash = result.hash;
      timestamp = result.timestamp;
    } catch (err) {
      console.error(
        ipfsLogPrefix,
        chalk.bold.red("Invalid setting hash or timestamp from Pinata pinning result."),
      );
      throw err;
    }
  } catch (err) {
    console.error(ipfsLogPrefix, chalk.bold.red("Failed to pin novel" + novel + "from build cache."));
    throw err;
  }

  return {
    novel,
    hash,
    name,
    timestamp,
  };
}

module.exports = {
  publishToPinata,
  duplicateAssetsToIPFS,
  PINATA_API_KEY,
  PINATA_SECRET_KEY,
};
