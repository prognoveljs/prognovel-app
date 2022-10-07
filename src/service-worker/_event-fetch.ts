/// <reference lib="webworker" />
import { prerender } from "./prerender";
import { preload } from "./_vars";
import { pickCache, normalizeURL } from "./utils";
import { validFetchEvent } from "./_validity";
import { pageNotPrerendered, redirect } from "./redirect";

self.addEventListener("fetch", eventHandler);

function eventHandler(event: FetchEvent) {
  if (!validFetchEvent(event)) return;

  event.respondWith(openCache(event, pickCache(event)));
}

async function openCache(event: FetchEvent, whichCache: string): Promise<Response> {
  console.time("Service worker HTML prerender");
  const cache = await caches.open(whichCache);
  let response;

  response = await offlineResponse(event, cache);
  if (response) return response;

  response = await onlineReponse(event, cache);
  if (response) return response;

  console.error("Service worker failed to use intended strategies.");
  return await fetch(event.request);
}

async function offlineResponse(event: FetchEvent, cache: Cache): Promise<Response | null> {
  const url = new URL(event.request.url);
  const requestInfo: RequestInfo = await normalizeURL(event.request);

  let offlineResponse: Response = await cache.match(requestInfo);

  if (offlineResponse) {
    try {
      const result = await prerender(offlineResponse, cache, {
        preloadHome: preload.home(),
      });
      return result;
    } catch (err) {
      console.error("Service worker error when pre-rendering response.");
      return offlineResponse;
    }
  } else {
    if (pageNotPrerendered.includes(url.pathname.split("/")[1]) && !url.searchParams.get("load")) {
      console.log(url.pathname);
      return redirect(url);
    }
  }

  return null;
}

async function onlineReponse(event: FetchEvent, cache: Cache): Promise<Response | null> {
  const url = new URL(event.request.url);
  const path = url.pathname;

  try {
    const onlineResponse = await fetch(event.request);
    // don't use await here
    await cache.put(event.request, onlineResponse.clone());
    return onlineResponse;
  } catch (err) {
    console.error("Service worker error when fetching", event.request);
    return null;
  }
}
