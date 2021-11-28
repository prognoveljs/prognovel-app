import { NOVEL_BANNER_HEIGHT, BACKEND_API } from "settings";

export let isWEBP: boolean;
const BANNER_IMAGE_FETCH_TIMEOUT = 10000; // in ms

export async function initImageTypeSupport(): Promise<boolean> {
  isWEBP = true;

  // if (isWEBP) {
  //   console.log("Can use WEBP.");
  // } else {
  //   console.log("Can't use WEBP.");
  // }

  return isWEBP;
}

export function getNovelBannerImageWidth(): number {
  return document.body.clientWidth - document.body.querySelector("nav").offsetWidth;
}

const endpoint = BACKEND_API + "/image?";
const url =
  "https://raw.githubusercontent.com/ProgNovel/prognovel-contents/master/novels/yashura-legacy/banner.jpeg";

export function getNovelBannerImageSrc(novel: string, width: number, height: number): string {
  return endpoint + `width=${width}&height=${height}&url=${getNovelBannerRawUrl()}`;

  function getNovelBannerRawUrl() {
    return url;
  }
}

export function prefetchBannerImage(novel: string): void {
  appendBannerImageStream(
    novel,
    getNovelBannerImageSrc(novel, getNovelBannerImageWidth(), NOVEL_BANNER_HEIGHT),
  );
}

interface BannerImage {
  data: Uint8Array;
  type: string;
}

// TODO - buffers from banner image stored in memory
//        implement custom garbage collection later on if necessary
//        (or, use WeakMap instead to automatically clean memory)
const bannerImages = new Map<string, BannerImage>();
export async function appendBannerImageStream(key: string, src: string) {
  if (bannerImages[key]) return;
  bannerImages[key] = {
    data: [],
  };
  const res = await fetch(src);
  const type = res.headers.get("content-type").slice(6); // slice "image/" from "image/webp"
  bannerImages[key].type = type;

  // initialize streams
  const reader = res.body.getReader();
  while (true) {
    const { value, done } = await reader.read();

    if (value) {
      bannerImages[key].data.push(...value);
    }

    updateBannerImage(key, type, bannerImages[key].data);

    if (done) break;
  }
}

export function updateBannerImage(key: string, type?: string, data?: Uint8Array) {
  let img = document.body.querySelector(`img[data-banner=${key}]`) as HTMLImageElement;
  if (!img) return;

  if (data) {
    img.src = imageBase64Encode(data, type || "jpeg");
    return;
  }

  if (!bannerImages[key]) {
    appendBannerImageStream(
      key,
      getNovelBannerImageSrc(key, getNovelBannerImageWidth(), NOVEL_BANNER_HEIGHT),
    );
  }

  new Promise((resolve) => {
    function checkImageBannerExists() {
      if (bannerImages[key].data.length) resolve(bannerImages[key].data);
      requestAnimationFrame(checkImageBannerExists);
    }
    checkImageBannerExists();
  })
    .then((uint8: Uint8Array) => {
      if (!type) type = bannerImages[key].type;
      // TODO - create a more performant way to update image on streaming
      //      - if possible use canvas (offscreen if latency is good)
      img.src = imageBase64Encode(uint8, type || "jpeg");
    })
    .catch(console.error);
}

export function imageBase64Encode(uint8: Uint8Array, type: string) {
  let b64encoded = btoa(
    [].reduce.call(
      uint8,
      // @ts-ignore
      (p: string, c: number) => {
        return p + String.fromCharCode(c);
      },
      "",
    ),
  );

  let mimetype = "image/" + type;
  return "data:" + mimetype + ";base64," + b64encoded;
}

export function getCoverURLPath(
  novel: string,
  size: { width: number; height: number },
  type?: "png" | "webp" | "jpg" | "jpeg",
) {
  if (!type) type = isWEBP ? "webp" : "jpeg";
  const sizeString = size.width !== size.height ? `${size.width}x${size.height}` : size.width;
  return `/publish/${novel}/cover-${sizeString}.${type}`;
}
