/// <reference lib="webworker" />
import { get } from "idb-keyval";
import { assets } from "./_vars";

declare var self: any;

self.addEventListener("install", (event: FetchEvent) => {
  event.waitUntil(initCache(event));
});

async function initCache(event): Promise<void> {
  const cache: Cache = await caches.open(assets.name);
  const files = assets.cache.files();
  const hasInstalled = await get("service-worker-installed");
  const broadcast = new BroadcastChannel("service-worker");
  let downloaded = 0;

  if (hasInstalled) {
    broadcast.postMessage({
      type: "install",
      fileCount: files.length,
    });
  }

  const queue = files.map(async (file) => {
    return new Promise(async (resolve, reject) => {
      try {
        await cache.add(file);
        if (hasInstalled) {
          broadcast.postMessage({
            fileDownloaded: ++downloaded,
          });
        }
        resolve("");
      } catch (error) {
        console.error(error);
        reject(`failed adding "${file}" to cache`);
      }
    });
  });

  if ("allSettled" in Promise) {
    await Promise.allSettled(queue);
  } else {
    await Promise.all(queue);
  }

  console.log("⚙️⚙️ begin installing new app...");
  // await cache.addAll(assets.cache.files());
  self.skipWaiting();

  const fonts: string[] = assets.cache.fonts();
  if (fonts.length) {
    const fontCache: Cache = await caches.open("fonts");
    await fontCache.addAll(fonts);
  }
  console.log("⚙️⚙️ all files added to service worker.");
}
