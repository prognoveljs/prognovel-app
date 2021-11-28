require("dotenv").config();
const sharp = require("sharp");
const fetch = require("node-fetch");
const { createWriteStream, existsSync, mkdirSync, writeFileSync } = require("fs");
const { assetsFolder } = require("./_shared");
const { join } = require("path");
const { on } = require("events");

if (!existsSync(assetsFolder)) mkdirSync(assetsFolder, { recursive: true });
let apiEndpoint = process.env.BACKEND_API;
if (apiEndpoint.slice(-1) === "/") apiEndpoint = apiEndpoint.slice(0, -1);
(async function () {
  const res = await fetch(process.env.BACKEND_API);
  const siteMetadata = await res.json();
  const { novels } = siteMetadata;

  for (const novel of novels) {
    const opts = {
      path: "publish/" + novel,
    };
    downloadAsset("banner", novel, opts);
    downloadAsset("cover", novel, {
      ...opts,
      resize: [
        { width: 64, height: 64 },
        { width: 128, height: 128 },
        { width: 256, height: 256 },
        { width: 512, height: 512 },
      ],
      ext: ["webp", "jpeg"],
    });
  }

  downloadAsset("favicon", "", {
    resize: {
      width: 32,
      height: 32,
    },
  });

  downloadAsset("logo", "", {
    resize: [
      {
        width: null,
        height: 500,
      },
      {
        width: null,
        height: 256,
      },
      {
        width: null,
        height: 192,
      },
      {
        width: null,
        height: 64,
      },
    ],
  });

  downloadStaticAPIs(siteMetadata);
  downloadComponentsZip();
})();

function downloadAsset(file, novel = "", opts = {}) {
  let path = assetsFolder;

  let url = `${apiEndpoint}/fetchImage?file=${file}`;
  if (novel) url += `&novel=${novel}`;
  if (opts.path) {
    if (opts.path.slice(0, 1) !== "/") opts.path = "/" + opts.path;
    path += opts.path;
    checkPathExist(path);
  }

  fetch(url).then(async (res) => {
    let transformerRaw = res.body.pipe(sharp());
    for (const type of Array.isArray(opts.ext) ? opts.ext : [opts.ext || "png"]) {
      if (opts.resize) {
        (Array.isArray(opts.resize) ? opts.resize : [opts.resize]).forEach((size) => {
          const sizeLabel = Array.isArray(opts.resize)
            ? `-${
                size.width ||
                "" + (Boolean(size.width && size.height) ? "x" : "") + size.height ||
                ""
              }`
            : "";
          getTransformImageType(transformerRaw.clone(), type)
            .resize(size)
            .pipe(createWriteStream(path + `/${file}${sizeLabel}.${type || "png"}`));
        });
      } else {
        getTransformImageType(transformerRaw.clone(), type).pipe(
          createWriteStream(path + `/${file}.${type || "png"}`),
        );
      }
    }
  });
}

function checkPathExist(path) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}

function getTransformImageType(transform, type) {
  switch (type) {
    case "png":
      return transform.png();
    case "jpg" || "jpeg":
      return transform.jpeg();
    case "webp":
      return transform.webp();
    default:
      return transform.png();
  }
}

function downloadStaticAPIs(siteMetadata) {
  writeFileSync(
    join(assetsFolder, "publish", "sitemetadata.json"),
    JSON.stringify(siteMetadata, null, 2),
    "utf-8",
  );

  for (const novel of siteMetadata.novels) {
    if (existsSync(`${assetsFolder}/publish/${novel}`)) {
      mkdirSync(`${assetsFolder}/publish/${novel}`, { recursive: true });
    }
    fetch(apiEndpoint + "/novel?name=" + novel).then((res) => {
      res.body.pipe(createWriteStream(`${assetsFolder}/publish/${novel}/metadata.json`, "utf-8"));
    });
  }
}

async function downloadComponentsZip() {
  const zipFile = ".cache/components.zip";
  const out = join(process.cwd(), "src/node_modules/");
  console.log(out);
  if (!existsSync(out)) mkdirSync(out, { recursive: true });
  const res = await fetch(apiEndpoint + "/fetchData?file=components.zip");
  const stream = createWriteStream(zipFile);
  res.body.pipe(stream);

  stream.on("close", async () => {
    try {
      await require("extract-zip")(zipFile, { dir: out });
    } catch (error) {
      throw error;
    }
  });
}
