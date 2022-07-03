export const pageNotPrerendered = ["read", "discussions"];

export function redirect(url: URL) {
  const originalPathname = url.pathname;
  const path = url.pathname.split("/")[1];
  url.searchParams.set("load", originalPathname.split(path)[1]);
  url.pathname = path;
  return Response.redirect(`${url.origin}/${path}?load=${originalPathname.split(path + "/")[1]}`);
}
