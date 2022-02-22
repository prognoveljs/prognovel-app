import { NOVEL_BANNER_HEIGHT, IMAGE_RESIZER_SERVICE } from "$lib/_setting.ts";

export let isWEBP: boolean;
const BANNER_IMAGE_FETCH_TIMEOUT = 10000; // in ms

export async function initImageTypeSupport(): Promise<boolean> {
  isWEBP = true;

  const canvas = document.createElement("canvas");
  if (!!(canvas.getContext && canvas.getContext("2d"))) {
    isWEBP = canvas.toDataURL("image/webp").indexOf("data:image/webp") == 0;
  } else {
    isWEBP = false;
  }
  // very old browser like IE 8, canvas not supported
  return isWEBP;
}

export function getNovelBannerImageWidth(): number {
  return document.body.clientWidth - document.body.querySelector("nav").offsetWidth;
}

const imageEndpoint = (
  novel: string,
  { width, height, type = isWEBP ? "webp" : "jpeg", imageResizerService = "" },
) => {
  // return imageResizerService
  //   ? `${imageResizerService}/resize?width=${width}&height=${height}&type=${type}&nocrop=false&stripmeta=true&url=${encodeURIComponent(
  //       import.meta.env.BACKEND_API + `/fetchImage?novel=${novel}&file=banner`,
  //     )}`
  //   : import.meta.env.BACKEND_API + `/fetchImage?novel=${novel}&file=banner`;
  return (
    import.meta.env.BACKEND_API +
    `/fetchImage?novel=${novel}&file=banner${
      imageResizerService
        ? `&width=${width}&height=${height}&type=${type}&imageresizeservice=${imageResizerService}`
        : ""
    }`
  );
};

export function prefetchBannerImage(novel: string): void {
  appendBannerImageStream(
    novel,
    imageEndpoint(novel, {
      width: getNovelBannerImageWidth(),
      height: NOVEL_BANNER_HEIGHT,
      type: isWEBP ? "webp" : "jpeg",
      imageResizerService: IMAGE_RESIZER_SERVICE,
    }),
  );
}

interface BannerImage {
  data: Uint8Array;
  type: string;
}

// TODO - buffers from banner image stored in memory
//        implement custom garbage collection later on if necessary
//        (or, use WeakMap instead to automatically clean memory)
export const bannerImages = new Map<string, BannerImage>();
export async function appendBannerImageStream(key: string, src: string) {
  if (bannerImages[key]) return;
  bannerImages[key] = {
    data: new Uint8Array(),
  };
  const res = await fetch(src);
  const type = res.headers.get("content-type").slice(6); // slice "image/" from "image/webp"
  bannerImages[key].type = type;
  console.log(src);
  // initialize streams
  const reader = res.body.getReader();
  while (true) {
    const { value, done } = await reader.read();

    if (value) {
      bannerImages[key].data = new Uint8Array([...bannerImages[key].data, ...value]);
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
      imageEndpoint(key, {
        width: getNovelBannerImageWidth(),
        height: NOVEL_BANNER_HEIGHT,
        type: isWEBP ? "webp" : "jpeg",
        imageResizerService: IMAGE_RESIZER_SERVICE,
      }),
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
  type?: "png" | "webp" | "jpg" | "jpeg" | "avif",
) {
  if (!type) type = isWEBP ? "webp" : "jpeg";
  const sizeString = size.width !== size.height ? `${size.width}x${size.height}` : size.width;
  return `/publish/${novel}/cover-${sizeString}.${type}`;
}
