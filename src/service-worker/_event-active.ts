/// <reference lib="webworker" />
import { get, set } from "idb-keyval";
import { validCacheKey } from "./_cache";

declare var self: any;

self.addEventListener("activate", (event: FetchEvent) => {
  event.waitUntil(activateSW());
});

async function activateSW(): Promise<void> {
  console.log("⚙️⚙️ Activing service worker...");
  const hasInstalled = await get("service-worker-installed");
  const keys: string[] = await caches.keys();
  await Promise.all(keys.map(deleteCache));

  self.clients.claim();
  if (hasInstalled) {
    const broadcast = new BroadcastChannel("service-worker");
    broadcast.postMessage({
      type: "activate",
    });
  } else {
    await set("service-worker-installed", true);
  }
}

async function deleteCache(key: string): Promise<void> {
  if (!validCacheKey(key)) {
    await caches.delete(key);
    console.log("⚙️⚙️ Deleting old cache:" + key);
  }
}
