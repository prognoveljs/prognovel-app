import dotenv from "dotenv";
dotenv.config();
import sharp from "sharp";
import fetch from "node-fetch";
import { createWriteStream, existsSync, mkdirSync, writeFileSync } from "fs";
import { assetsFolder, isValidHttpUrl } from "./_shared.js";
import { join } from "path";
import { on } from "events";

const IS_STATIC_API = (process.env.BACKEND_API || "").includes(".pages.dev");

let STATIC_BANNER_IMAGES = false;

if (!existsSync(assetsFolder)) mkdirSync(assetsFolder, { recursive: true });

let apiEndpoint = new URL(process.env.BACKEND_API);
const siteMetadataURL = apiEndpoint;
if (IS_STATIC_API) siteMetadataURL.pathname = "sitemetadata.json";

(async function () {
  const res = await fetch(siteMetadataURL.href);
  const siteMetadata = await res.json();
  const { novels, image_resizer_service } = siteMetadata;
  STATIC_BANNER_IMAGES = IS_STATIC_API || isValidHttpUrl(image_resizer_service);

  for (const novel of novels) {
    const opts = {
      path: "publish/" + novel,
    };
    downloadAsset("banner", novel, {
      ...opts,
      resize: STATIC_BANNER_IMAGES
        ? [
            { width: 480, height: 400 },
            { width: 800, height: 400 },
            { width: 1000, height: 400 },
            { width: 1400, height: 400 },
            { width: 1900, height: 400 },
          ]
        : null,
      ext: ["webp", "avif", "jpeg"],
    });
    downloadAsset("cover", novel, {
      ...opts,
      resize: [
        { width: 64, height: 64 },
        { width: 128, height: 128 },
        { width: 256, height: 256 },
        { width: 512, height: 512 },
      ],
      ext: ["webp", "avif", "jpeg"],
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
        height: 128,
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

async function downloadAsset(file, novel = "", opts = {}) {
  let path = assetsFolder;

  let url = apiEndpoint;
  // let url = `${apiEndpoint}/fetchImage?file=${file}`;
  if (IS_STATIC_API) {
    url.pathname = novel + "/" + file + ".png";
  } else {
    url.pathname = "fetchImage";
    url.searchParams.set("file", file);
    if (novel) url.searchParams.set("novel", novel);
  }

  if (opts.path) {
    if (opts.path.slice(0, 1) !== "/") opts.path = "/" + opts.path;
    path += opts.path;
    checkPathExist(path);
  }

  fetch(url.href).then(async (res) => {
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
            .resize({ ...size, withoutEnlargement: true })
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
      return transform.jpeg({
        quality: 70,
        mozjpeg: true,
      });
    case "webp":
      return transform.webp();
    case "avif":
      return transform.avif();
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
    let novelMetadataURL = apiEndpoint;
    if (IS_STATIC_API) {
      novelMetadataURL.pathname = novel + "/metadata.json";
    } else {
      novelMetadataURL.pathname = novel;
      novelMetadataURL.searchParams.set("name", novel);
    }
    fetch(novelMetadataURL.href).then((res) => {
      res.body.pipe(createWriteStream(`${assetsFolder}/publish/${novel}/metadata.json`, "utf-8"));
    });
  }
}

async function downloadComponentsZip() {
  const zipFile = ".cache/components.zip";
  const out = join(process.cwd(), "src/lib/.generated");
  console.log(out);
  if (!existsSync(out)) mkdirSync(out, { recursive: true });
  const url = apiEndpoint;
  if (IS_STATIC_API) {
    url.pathname = "components.zip";
  } else {
    url.pathname = "fetchData";
    url.searchParams.set("file", "components.zip");
  }
  const res = await fetch(url.href);
  const stream = createWriteStream(zipFile);
  res.body.pipe(stream);

  stream.on("close", async () => {
    try {
      const extract = (await import("extract-zip")).default;
      extract(zipFile, { dir: out });
    } catch (error) {
      throw error;
    }
  });
}
