import { assets, cachedRoutes } from "./_vars";
import { isHTML } from "./prerender";

// TODO - refactor pick cache filter logic and combine it with assets filter
export function pickCache(event: FetchEvent): string {
  const url = new URL(event.request.url);
  if (url.pathname.includes("fonts/")) {
    return "fonts";
  } else if (url.pathname.includes("wasm/")) {
    return "web-assembly";
  } else if (url.pathname.includes("publish/") && !url.pathname.endsWith(".json")) {
    return "publish-assets";
  } else {
    return assets.name;
  }
}

export async function normalizeEventRequest(req: Request): Promise<Request> {
  const url = await normalizeURL(req);
  return new Request(url, {
    headers: req.headers,
    cache: req.cache,
    integrity: req.integrity,
    body: req.body,
    credentials: req.credentials,
    keepalive: req.keepalive,
    method: req.method,
    // mode: req.mode,
    redirect: req.redirect,
    referrer: req.referrer,
    referrerPolicy: req.referrerPolicy,
    signal: req.signal,
    // req.window doesn't exist on Request error
    // window: req.window,
  });
}

/**
 * Takes a Request as parameter and check if the request content type
 * is HTML. If truthy, it will check whether the url has '/' in the end
 * of the string, then returns the url required to match Service Workers cache
 * key.
 * @param req Request
 * @returns url
 */
export async function normalizeURL(req: Request): Promise<RequestInfo> {
  let url = req.url;
  const path = new URL(url).pathname;

  // TODO make route checking more performance
  if (!cachedRoutes.includes(path + "/")) return url;

  if (url !== "/") url += "/";

  return url;
}
