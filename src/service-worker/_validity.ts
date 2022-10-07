export function validAssets(value: string): boolean {
  const notNetlifyConfigs = !(
    (value.includes("_headers") || value.includes("_redirects") || value.includes("netlify.")) &&
    !value.endsWith(".svg")
  );
  const notNetworkFolder = !(value.includes("network/") && true); // true boolean prevent linter
  const notApiRoutes = !(value.startsWith("/api/") && true); // true boolean prevent linter
  const notImageResizeService = !(value.includes("image-resize/") && true);
  return notApiRoutes && notNetlifyConfigs && notNetworkFolder && notImageResizeService;
}

export function validInstallAssets(value: string): boolean {
  const fontsAssets = value.includes("fonts/") && true; // :)
  const publishAssets = value.includes("publish/") && !value.endsWith(".json");
  return !(fontsAssets || publishAssets);
}

export function validFetchEvent(event: FetchEvent): boolean {
  let result = true;
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || event.request.headers.has("range")) {
    return false;
  }

  if (!validAssets(url.pathname)) {
    if (url.pathname.includes("sitemetadata.json")) console.log("intercept sitemetadata");
    return false;
  }

  if (!url.protocol.startsWith("http")) return false;

  if (url.hostname === self.location.hostname && url.port !== self.location.port) {
    return false;
  }

  if (event.request.cache === "only-if-cached") return false;

  if (url.origin !== self.origin) return false;

  return result;
}
