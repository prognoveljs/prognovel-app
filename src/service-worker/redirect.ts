export const isReadPage = "/read/";

export async function redirect(cache: Cache, path: string) {
  const response = await cache.match("/read/");
  if (!response) return;
  const html = await response.text();
  const init = {
    headers: {
      "Content-Type": "text/html",
    },
  };
  return new Response(
    html.replace("</head>", `<meta name="redirect" content="${path}" /></head>`),
    init,
  );
}
