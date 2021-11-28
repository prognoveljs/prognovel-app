import { rewriteHTML } from "./rewrite-html";

export const isHTML = /text\/html/;

export async function prerender(response: Response, cache: Cache, preload = {}) {
  const contentType = response.headers.get("Content-Type");
  const url = new URL(response.url);

  // check file and call prerender function
  // depending of the content type
  if (isHTML.test(contentType)) {
    return await rewriteHTML(response, preload);
  }

  // no prerender, return with original cache
  return response;
}
